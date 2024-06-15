import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleLoadService {
  constructor() {}

  appendAllStyles() {
    this.appendStyle('bootstrap.css');
    this.appendStyle('styles.css');
    this.appendStyle('bootstrap-icons.css');
  }

  appendStyle(name: string) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = name;
    document.head.appendChild(style);
  }
}
