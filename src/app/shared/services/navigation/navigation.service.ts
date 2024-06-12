import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private source: string | null = null;
  private sourceSubject = new BehaviorSubject<string | null>(null);
  source$ = this.sourceSubject.asObservable();
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.trackSource().subscribe();
  }

  private getMergedQueryParams(additionalParams: any = {}) {
    // Always include app_source if it's available
    const queryParams: any = { app_source: this.source };

    // Merge additionalParams only if they are explicitly provided
    for (const key in additionalParams) {
      if (additionalParams.hasOwnProperty(key)) {
        queryParams[key] = additionalParams[key];
      }
    }

    return queryParams;
  }

  private navigate(path: string, additionalParams: any = {}) {
    this.router.navigate([path], {
      queryParams: this.getMergedQueryParams(additionalParams),
    });
  }

  private trackSource() {
    return this.activatedRoute.queryParams.pipe(
      tap((params) => {
        if (params['app_source']) {
          this.source = params['app_source'];
          this.sourceSubject.next(this.source);
        }
      })
    );
  }

  navigateToHome() {
    this.navigate('/');
  }

  navigateToDestinations() {
    this.navigate('product/destinations');
  }

  navigateToDetail(id: string) {
    this.navigate(`product/details/${id}`);
  }

  navigateToBasket() {
    this.navigate('transaction/basket');
  }

  navigateToLogin() {
    this.navigate('/login');
  }

  navigateToThankYou() {
    this.navigate('transaction/thankyou');
  }

  navigateToCheckout() {
    this.navigate('transaction/checkout');
  }

  navigateToDestinationResults(query: string) {
    this.navigate('product/destinations', {
      search_term: query,
    });
  }
}
