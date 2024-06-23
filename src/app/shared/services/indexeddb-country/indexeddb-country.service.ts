import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defer,
  from,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Destination } from '../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class IndexdbCountryService {
  db: any;
  private dbInitialized = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeIndexedDB()
      .pipe(
        take(1),
        tap(() => {
          console.log('IndexedDB initialized');
          this.dbInitialized.next(true);
        })
      )
      .subscribe();
  }
  private initializeIndexedDB() {
    return defer(() => {
      return from(import('../../../db-feature-destinations')).pipe(
        take(1),
        tap((module) => {
          this.db = module.db;
        })
      );
    });
  }

  getAllDestinations(): Observable<Destination[]> {
    return this.dbInitialized.pipe(
      switchMap((initiated: boolean) =>
        initiated
          ? (this.db.getFeatureDestinations() as Observable<Destination[]>)
          : of([])
      )
    );
  }

  addFeatureDestinations(destinations: Destination[]): Observable<string[]> {
    return this.dbInitialized.pipe(
      take(1),
      switchMap((initiated: boolean) => {
        if (initiated) {
          return this.db.addFeatureDestinations(destinations) as Observable<
            string[]
          >;
        }
        return of([]);
      })
    );
  }
}
