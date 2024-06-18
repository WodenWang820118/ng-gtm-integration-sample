import { forkJoin, from } from 'rxjs';
import Dexie, { Table, liveQuery } from 'dexie';
import { Destination } from './shared/models/destination.model';

export class DestinationDto implements Destination {
  constructor(
    public id: string,
    public country: string,
    public city: string,
    public latitude: number,
    public longitude: number,
    public description: string,
    public title: string,
    public smallTitle: string,
    public image1: string,
    public image1AuthorInfo: string,
    public image2: string,
    public image2AuthorInfo: string,
    public image3: string,
    public image3AuthorInfo: string,
    public imageBig: string,
    public imageBigAuthorInfo: string,
    public price: number,
    public video: string
  ) {}
}

export class FeatureDestinations extends Dexie {
  featureDestinations!: Table<Destination, string>;

  constructor() {
    super('ng-gtm-integration');
    this.version(3).stores({
      featureDestinations: '++id, [country+city]',
    });

    this.featureDestinations.mapToClass(DestinationDto);
  }

  getFeatureDestinations() {
    return liveQuery(() => {
      console.log('Getting destinations from IndexedDB');
      return this.featureDestinations.toArray();
    });
  }

  addFeatureDestinations(destinations: Destination[]) {
    const addOperations = destinations.map((destination) => {
      return from(this.featureDestinations.add(destination));
    });

    return forkJoin(addOperations);
  }

  addFeatureDestination(destination: Destination) {
    return from(this.featureDestinations.add(destination));
  }

  getDestinationsByCountryAndCity(country: string, city: string) {
    return liveQuery(() => {
      return this.featureDestinations
        .where('[country+city]')
        .equals([country, city])
        .toArray();
    });
  }
}

export const db = new FeatureDestinations();
console.log('db schema created: ', db.featureDestinations);
