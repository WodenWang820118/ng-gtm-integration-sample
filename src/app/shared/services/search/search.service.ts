import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';
import { FirestoreCountryService } from '../firestore-country/firestore-country.service';
import { Destination } from '../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchResults = new BehaviorSubject(
    this.firestoreCountryService.getPreviousDocsStack()
  );
  readonly searchResults$ = this._searchResults.asObservable();

  private options = {
    includeScore: true,
    keys: ['title', 'smallTitle', 'description'],
    threshold: 0.2,
  };

  constructor(
    private analyticsService: AnalyticsService,
    private firestoreCountryService: FirestoreCountryService
  ) {}

  search(query: string): void {
    if (!query) {
      this._searchResults.next(
        this.firestoreCountryService.getPreviousDocsStack()
      );
      return;
    }

    if (query == 'all') {
      this._searchResults.next(
        this.firestoreCountryService.getPreviousDocsStack()
      );
      this.analyticsService.trackEvent('search', query);
      return;
    }

    this.firestoreCountryService
      .getSearchResultsData(query, 10)
      .subscribe((destinations: Destination[]) => {
        this.analyticsService.trackEvent('search', query);
        const fuse = new Fuse(destinations, this.options);
        const results = fuse.search(query).map((result) => result.item);
        console.log(results);
        this._searchResults.next(results);
      });
  }

  resetSearch(): void {
    this._searchResults.next(
      this.firestoreCountryService.getPreviousDocsStack()
    );
  }
}
