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
export class IndexeddbDestinationService {
  db: any;
  private dbInitialized = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeIndexedDB()
      .pipe(
        take(1),
        tap(() => {
          console.log('IndexedDB: regular destinations initialized');
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

  getAllDestinations(): Observable<Destination[]> {
    return this.dbInitialized.pipe(
      switchMap((initiated: boolean) =>
        initiated
          ? (this.db.getDestinations() as Observable<Destination[]>)
          : of([])
      )
    );
  }

  addDestinations(destinations: Destination[]): Observable<string[]> {
    return this.dbInitialized.pipe(
      take(1),
      switchMap((initiated: boolean) => {
        if (initiated) {
          console.log('Adding destinations to IndexedDB: ', destinations);
          return this.db.addDestinations(destinations) as Observable<string[]>;
        }
        return of([]);
      })
    );
  }
}
