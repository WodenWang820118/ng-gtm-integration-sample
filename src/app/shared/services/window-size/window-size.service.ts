import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, debounce, debounceTime, fromEvent, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService implements OnDestroy {
  private widthSubject = new BehaviorSubject<number>(window.innerWidth);
  width$ = this.widthSubject.asObservable();

  constructor() {
    this.onResize().subscribe();
  }

  onResize() {
    return fromEvent(window, 'resize').pipe(
      debounceTime(100),
      tap((event) => {
        this.widthSubject.next((event.target as Window).innerWidth);
      })
    );
  }

  ngOnDestroy() {
    this.widthSubject.unsubscribe();
  }
}
