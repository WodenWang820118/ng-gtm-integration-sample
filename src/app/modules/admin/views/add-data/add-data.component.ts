import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import countries from 'world-countries';
import { latitudeValidator, longitudeValidator } from './validators';
import { FirebaseDestinationUploadService } from '../../../../shared/services/firebase-destination-upload/firebase-destination-upload.service';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-data.component.html',
  styles: [``],
})
export class AddDataComponent {
  countries = countries;
  destinationForm = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    latitude: ['', Validators.required, latitudeValidator()],
    longitude: ['', Validators.required, longitudeValidator()],
    description: [''],
  });
  constructor(
    private fb: FormBuilder,
    private firebaseDestinationUploadService: FirebaseDestinationUploadService
  ) {}

  addDestination() {
    if (this.destinationForm.invalid) {
      console.log('Invalid form');
      console.log(this.destinationForm.value);
      console.log(this.destinationForm.errors);
      return;
    } else {
      console.log(this.destinationForm.value);
      this.firebaseDestinationUploadService
        .upload(this.destinationForm.value)
        .subscribe();
    }
  }
}
