import { Component, Input } from '@angular/core';
import { DestinationService } from '../../services/destination/destination.service';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { SharedModule } from 'src/app/shared.module';
import { FormControl } from '@angular/forms';
import { Destination } from 'src/app/models/destination.model';
import { WindowSizeService } from 'src/app/services/window-size/window-size.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() title: string = '';
  @Input() smallTitle: string = 'The most beautiful places on Earth.';
  @Input() image1: string = '';
  @Input() image2: string = '';
  @Input() image3: string = '';
  @Input() description: string = '';
  destination$: Observable<Destination> =
    this.destinationService.destinationSource$;

  numberOfPersonsControl = new FormControl(1);
  constructor(
    public windowSizeService: WindowSizeService,
    public destinationService: DestinationService,
    private orderService: OrderService,
    private navigationService: NavigationService
  ) {}

  navigateToDestinations() {
    this.navigationService.navigateToDestinations();
  }

  addToCart(destination: Observable<Destination>): void {
    const numOfPersons = this.numberOfPersonsControl.value;
    if (numOfPersons) this.orderService.addToCart(destination, numOfPersons);
  }
}
