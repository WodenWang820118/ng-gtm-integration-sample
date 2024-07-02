import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { FirestoreDestinationPipelineService } from '../firestore-destination-pipeline/firestore-destination-pipeline.service';
import { Destination } from '../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchResults = new BehaviorSubject([] as Destination[]);
  readonly searchResults$ = this._searchResults.asObservable();

  constructor(
    private analyticsService: AnalyticsService,
    private firestoreDestinationPipelineService: FirestoreDestinationPipelineService
  ) {}

  search(query: string): void {
    switch (query) {
      case '':
        this.firestoreDestinationPipelineService
          .getPreviousDestinationsData()
          .pipe(
            take(1),
            tap((data) => {
              this._searchResults.next(data);
            })
          )
          .subscribe();
        break;

      case 'all':
        this.firestoreDestinationPipelineService
          .getAllDestinationsData()
          .pipe(
            take(1),
            tap((data) => {
              this._searchResults.next(data);
            })
          )
          .subscribe();
        this.analyticsService.trackEvent('search', query);
        break;

      default:
        this.firestoreDestinationPipelineService
          .getSearchResultsData(query, 10)
          .subscribe((destinations: Destination[]) => {
            this.analyticsService.trackEvent('search', query);
            this._searchResults.next(destinations);
          });
        break;
    }
  }

  resetSearch(): void {
    this.firestoreDestinationPipelineService
      .getPreviousDestinationsData()
      .pipe(
        take(1),
        tap((data) => {
          this._searchResults.next(data);
        })
      )
      .subscribe();
  }
}
