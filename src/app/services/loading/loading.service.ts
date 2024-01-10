import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingState = new BehaviorSubject<boolean>(true);

  setLoadingState(isLoading: boolean) {
    this.loadingState.next(isLoading);
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingState.asObservable();
  }
}
