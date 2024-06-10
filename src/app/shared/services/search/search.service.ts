import { Injectable } from '@angular/core';
import { destinations } from '../destination/destinations';
import Fuse from 'fuse.js';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _destinations = [...destinations]; // Cache the original list
  private _searchResults = new BehaviorSubject(this._destinations);
  readonly searchResults$ = this._searchResults.asObservable();

  private options = {
    includeScore: true,
    keys: ['title', 'smallTitle', 'description'],
    threshold: 0.2,
  };

  constructor(private analyticsService: AnalyticsService) {}

  search(query: string): void {
    if (!query) {
      this._searchResults.next(this._destinations);
      return;
    }

    if (query == 'all') {
      this._searchResults.next(this._destinations);
      this.analyticsService.trackEvent('search', query);
      return;
    }

    this.analyticsService.trackEvent('search', query);
    const fuse = new Fuse(this._destinations, this.options);
    const results = fuse.search(query).map((result) => result.item);
    this._searchResults.next(results);
  }

  resetSearch(): void {
    this._searchResults.next(this._destinations);
  }
}
