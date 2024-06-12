import { Injectable } from '@angular/core';
import { firestore } from '../../../firebase/firestore';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import {
  of,
  defer,
  from,
  BehaviorSubject,
  tap,
  forkJoin,
  map,
  switchMap,
  Observable,
} from 'rxjs';
import { FirebaseStorageService } from '../firebase-storage/firebase-storage.service';
import { Destination } from '../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreCountryService {
  lastVisibleDocs = new BehaviorSubject<any | null>(null);
  previousDocsStack: any[] = [];

  constructor(private firebaseStorageService: FirebaseStorageService) {}

  getFirstDestinationsData(queryLimit = 2) {
    return this.fetchDestinations(() => this.getFirstDestinations(queryLimit));
  }

  getNextDestinationsData(queryLimit = 2) {
    return this.fetchDestinations(() => this.getNextDestinations(queryLimit));
  }

  getPreviousDestinationsData() {
    return this.fetchDestinations(() => this.getPreviousDestinations());
  }

  getSearchResultsData(searchQuery: string, queryLimit = 2) {
    return this.fetchDestinations(() =>
      this.getSearchResults(searchQuery, queryLimit)
    );
  }

  private getFirstDestinations(queryLimit = 2) {
    return defer(() =>
      from(
        getDocs(
          query(
            collection(firestore, 'countries'),
            orderBy('title'),
            limit(queryLimit)
          )
        )
      ).pipe(
        tap((documentSnapshots) => {
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          this.previousDocsStack = [lastVisible];
          this.lastVisibleDocs.next(lastVisible);
        })
      )
    );
  }

  private getNextDestinations(queryLimit = 2) {
    return defer(() => {
      const lastVisible = this.lastVisibleDocs.value;
      if (!lastVisible) {
        return of({} as QuerySnapshot<DocumentData, DocumentData>);
      }
      return from(
        getDocs(
          query(
            collection(firestore, 'countries'),
            orderBy('title'),
            startAfter(lastVisible),
            limit(queryLimit)
          )
        )
      ).pipe(
        tap((documentSnapshots) => {
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          this.previousDocsStack.push(lastVisible);
          this.lastVisibleDocs.next(lastVisible);
        })
      );
    });
  }

  private getPreviousDestinations() {
    return defer(() => {
      if (this.previousDocsStack.length < 2) {
        return of({} as QuerySnapshot<DocumentData, DocumentData>);
      }
      // Remove the current last visible document
      this.previousDocsStack.pop();
      const previousLastVisible =
        this.previousDocsStack[this.previousDocsStack.length - 1];
      return from(
        getDocs(
          query(
            collection(firestore, 'countries'),
            orderBy('title'),
            startAt(previousLastVisible),
            limit(2)
          )
        )
      ).pipe(
        tap((documentSnapshots) => {
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          this.lastVisibleDocs.next(lastVisible);
        })
      );
    });
  }

  private getSearchResults(searchQuery: string, queryLimit = 2) {
    const endTerm = searchQuery + '\uf8ff';
    return defer(() =>
      from(
        getDocs(
          query(
            collection(firestore, 'countries'),
            where('title', '>=', searchQuery),
            where('title', '<=', endTerm),
            limit(queryLimit)
          )
        )
      ).pipe(
        tap((documentSnapshots) => {
          const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
          this.previousDocsStack = [lastVisible];
          this.lastVisibleDocs.next(lastVisible);
        })
      )
    );
  }

  private fetchDestinations(
    fetchMethod: () => Observable<QuerySnapshot<DocumentData, DocumentData>>
  ) {
    return fetchMethod().pipe(
      switchMap((documents) => {
        const data = documents.docs.map((doc) => doc.data()) as Destination[];
        const destinationObservables = data.map((document) => {
          return forkJoin({
            image1: this.firebaseStorageService.getImage(document['image1']),
            image2: this.firebaseStorageService.getImage(document['image2']),
            image3: this.firebaseStorageService.getImage(document['image3']),
            imageBig: this.firebaseStorageService.getImage(
              document['imageBig']
            ),
          }).pipe(
            map((images) => ({
              ...document,
              ...images,
            }))
          );
        });
        return forkJoin(destinationObservables);
      })
    );
  }

  getPreviousDocsStackLength() {
    return this.previousDocsStack.length;
  }

  getPreviousDocsStack() {
    return this.previousDocsStack;
  }
}
