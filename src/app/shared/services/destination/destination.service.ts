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
    country: '',
    city: '',
    description: '',
    latitude: 0,
    longitude: 0,
    title: '',
    smallTitle: '',
    image1: '',
    image1AuthorInfo: '',
    image2: '',
    image2AuthorInfo: '',
    image3: '',
    image3AuthorInfo: '',
    imageBig: '',
    imageBigAuthorInfo: '',
    video: '',
    price: 0,
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
    this.trackSelectItem(destination);
  }

  trackSelectItem(destination: any): void {
    this.analyticsService.trackEvent('select_item', destination);
  }

  get destinationSource$() {
    return this.destinationSource.asObservable();
  }
}
