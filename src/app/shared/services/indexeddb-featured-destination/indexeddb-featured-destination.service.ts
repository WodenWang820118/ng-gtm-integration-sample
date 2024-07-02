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
export class IndexeddbFeaturedDestinationService {
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
      return from(import('../../../db-destinations')).pipe(
        take(1),
        tap((module) => {
          this.db = module.db;
        })
      );
    });
  }

  getAllFeaturedDestinations(): Observable<Destination[]> {
    return this.dbInitialized.pipe(
      switchMap((initiated: boolean) =>
        initiated
          ? (this.db.getFeaturedDestinations() as Observable<Destination[]>)
          : of([])
      )
    );
  }

  addFeaturedDestinations(destinations: Destination[]): Observable<string[]> {
    return this.dbInitialized.pipe(
      take(1),
      switchMap((initiated: boolean) => {
        if (initiated) {
          return this.db.addFeaturedDestinations(destinations) as Observable<
            string[]
          >;
        }
        return of([]);
      })
    );
  }
}
