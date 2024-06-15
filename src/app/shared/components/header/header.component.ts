import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <div class="container">
        <h1>GTM Travel</h1>
        <p class="lead">Splendid Google Tag Manager journey</p>
      </div>
    </header>
  `,
  styles: [
    `
      header {
        padding: 75px 0 15px 0;
        margin-bottom: 30px;
        background: #c0d0e5;
      }

      header h1 {
        margin: 0 0 6px 0;
        font-size: 50px;
        letter-spacing: 3px;
      }
    `,
  ],
})
export class HeaderComponent {}
