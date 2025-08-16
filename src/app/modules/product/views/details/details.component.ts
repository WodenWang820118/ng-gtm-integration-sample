import { Component, Input } from '@angular/core';
import { DestinationService } from '../../../../shared/services/destination/destination.service';
import { Observable } from 'rxjs';
import { OrderService } from '../../../../shared/services/order/order.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Destination } from 'src/app/shared/models/destination.model';
import { WindowSizeService } from 'src/app/shared/services/window-size/window-size.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { AsyncPipe } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-details',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    ButtonModule,
  ],
  templateUrl: './details.component.html',
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
  personOptions = Array.from({ length: 6 }, (_, i) => ({
    label: `${i + 1} ${i + 1 === 1 ? 'person' : 'persons'}`,
    value: i + 1,
  }));
  filteredPersons: { label: string; value: number }[] = [];

  constructor(
    public windowSizeService: WindowSizeService,
    public destinationService: DestinationService,
    private readonly orderService: OrderService,
    private readonly navigationService: NavigationService
  ) {}

  navigateToDestinations() {
    this.navigationService.navigateToDestinations();
  }

  addToCart(destination: Observable<Destination>): void {
    const numOfPersons = this.numberOfPersonsControl.value;
    if (numOfPersons) this.orderService.addToCart(destination, numOfPersons);
  }

  filterPersons(event: { query: string }): void {
    const query = event.query?.toLowerCase() || '';
    this.filteredPersons = this.personOptions.filter((opt) =>
      opt.label.toLowerCase().startsWith(query)
    );
  }
}
