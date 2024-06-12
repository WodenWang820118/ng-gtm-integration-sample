import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Destination } from '../../models/destination.model';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationSource = new BehaviorSubject<Destination>({
    id: '',
    title: '',
    smallTitle: '',
    image1: '',
    image2: '',
    image3: '',
    imageBig: '',
    imageHuge: '',
    price: 0,
    description: '',
  });

  constructor(private analyticsService: AnalyticsService) {
    this.destinationSource$
      .pipe(
        take(1),
        tap(() => {
          if (localStorage.getItem('destination')) {
            this.destinationSource.next(
              JSON.parse(localStorage.getItem('destination') || '[]')
            );
          }
        })
      )
      .subscribe();
  }

  changeDestination(destination: any): void {
    this.destinationSource.next(destination);
    localStorage.setItem('destination', JSON.stringify(destination));
    this.analyticsService.trackEvent('view_item', destination);
  }

  trackSelectItem(destination: any): void {
    this.analyticsService.trackEvent('select_item', destination);
  }

  get destinationSource$() {
    return this.destinationSource.asObservable();
  }
}
