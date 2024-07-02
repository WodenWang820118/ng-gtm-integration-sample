import { Injectable } from '@angular/core';
import { bucket } from '../../../firebase/bucket';
import { getDownloadURL, ref } from 'firebase/storage';
import { catchError, defer, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor() {}

  getImage(name: string) {
    return defer(() =>
      from(getDownloadURL(ref(bucket, `images/${name}`))).pipe(
        catchError((error) => {
          console.log('Error getting image', error);
          return of('');
        })
      )
    );
  }
}
