import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styles: [``],
})
export class DashboardComponent {}
