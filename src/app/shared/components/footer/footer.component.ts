import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div id="externalLinks">
          <ul>
            <li>
              Developer:
              <a href="https://github.com/WodenWang820118">Guan Xin Wang</a>
            </li>
          </ul>
        </div>
        <div id="newsletter-form">
          <form class="d-flex">
            <input
              type="text"
              class="form-control"
              placeholder="Newsletter..."
            />
            <button type="submit" class="btn btn-light">OK</button>
          </form>
          <div id="reponse"></div>
        </div>
        <div class="clear"></div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
