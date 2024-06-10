import { Injectable } from '@angular/core';
import { destinations } from '../destination/destinations';
import { AnalyticsEventTrackerFactory } from './analytics-factory';
import { BehaviorSubject, from, of, take, tap } from 'rxjs';
import { Order } from '../../models/order.model';
import { JavascriptInterfaceService } from '../javascript-interface/javascript-interface.service';
import { v4 as uuidv4 } from 'uuid';
import { DataLayerEvent, db } from '../../../db';
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private _checkoutOrders = new BehaviorSubject<Order[]>([]);

  constructor(
    private analyticsEventTrackerFactory: AnalyticsEventTrackerFactory,
    private javascriptInterfaceService: JavascriptInterfaceService
  ) {
    window.addEventListener('online', () => this.syncDataLayerEvents());
    window.dataLayer = window.dataLayer || [];
    this.loadInitialData();
  }

  saveDataLayerEvent(eventName: string, eventData: any) {
    if (!eventName || !eventData) return of('');
    if (!window.navigator.onLine) {
      // Save to IndexedDB when offline
      const id = uuidv4();
      const timestamp = new Date().getTime();
      const event: DataLayerEvent = { id, eventName, eventData, timestamp };
      return from(db.events.add(event)).pipe(
        tap(() => {
          console.log('Event saved to IndexedDB');
        })
      );
    } else {
      // Push directly to dataLayer when online
      window.dataLayer = window.dataLayer || [];

      // ecommerce events require a different dataLayer structure
      if (eventData.ecommerce) {
        window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object (if any
        window.dataLayer.push({
          event: eventName,
          ...eventData,
        });
        this.javascriptInterfaceService.logEvent(eventName, eventData);
        return of('');
      }
      // all other events
      window.dataLayer.push({ event: eventName, ...eventData });
      this.javascriptInterfaceService.logEvent(eventName, eventData);
      return of('');
    }
  }

  private syncDataLayerEvents() {
    console.log('Syncing events from IndexedDB');
    db.syncDataLayerEvents().subscribe();
  }

  trackEvent(eventName: string, eventData: any) {
    try {
      const eventTracker =
        this.analyticsEventTrackerFactory.createEvent(eventName);
      const data = eventTracker.getProcessedData(eventData);
      this.saveDataLayerEvent(eventName, data.eventData).subscribe();
    } catch (error) {
      console.log('Event not tracked:', eventName, eventData);
    }
  }

  trackPageViewECEvent(url: string): void {
    if (url.includes('/destinations')) {
      const items = destinations.map((destination) => ({
        item_id: destination.id,
        item_name: destination.title,
        item_category: destination.title,
        price: destination.price,
        quantity: 1,
      }));

      this.trackEvent('view_item_list', {
        ecommerce: {
          items,
        },
      });
    }

    if (url.includes('/checkout')) {
      this._checkoutOrders
        .pipe(
          take(1),
          tap((orders) => {
            this.trackEvent('begin_checkout', orders);
          })
        )
        .subscribe();
    }

    if (url.includes('/thankyou')) {
      // mimic a purchase event after a successful checkout
      this._checkoutOrders
        .pipe(
          take(1),
          tap((orders) => {
            this.trackEvent('purchase', orders);
          })
        )
        .subscribe();
    }
  }

  setCheckoutOrders(orders: Order[]): void {
    this._checkoutOrders.next(orders);
  }

  private loadInitialData(): void {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this._checkoutOrders.next(orders);
  }
}
