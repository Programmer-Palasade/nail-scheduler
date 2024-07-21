import { inject, Injectable, OnDestroy } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDoc, onSnapshot, QueryDocumentSnapshot, SnapshotOptions, Timestamp, Unsubscribe, WithFieldValue } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnDestroy {
  private fs = inject(Firestore);
  private auth = inject(AuthService);

  public businesses: Map<string, Business> = new Map();

  constructor() {
  }

  ngOnDestroy(): void {
    for (let b of this.businesses) {
      b[1].unlisten();
    }
  }

  get user(): User|null {
    return this.auth.user;
  }

  public async get_business(business_id: string): Promise<Business> {
    let bus_col = collection(this.fs, 'businesses').withConverter( {
      toFirestore(business: WithFieldValue<Business>): DocumentData {
        return {
          availability: business.availability,
          icon: business.icon,
          name: business.name,
          options: business.options,
          owner_uid: business.owner_uid,
          socials: business.socials
        };
      },
      fromFirestore( snapshot: QueryDocumentSnapshot, options: SnapshotOptions ): Business {
        const data = snapshot.data(options);
        let new_b = new Business();
        new_b.availability = data['availability'];
        new_b.icon = data['icon'];
        new_b.name = data['name'];
        new_b.options= data['options'];
        new_b.owner_uid = data['owner_uid'];
        new_b.socials = data['socials'];
        return new_b;
      }
    })
    let b = await getDoc( doc(bus_col, business_id) ).then( snapshot => {
      if (snapshot.exists()) {
        let b = snapshot.data() as Business;
        b.listen(this.fs, business_id);
        return b;
      }
      return new Business();
    });
    this.businesses.get(business_id)?.unlisten();
    this.businesses.set(business_id, b);
    return b;
  }
}


export class Business {
  public availability: Map<number, number[]> = new Map();
  public icon: string = "";
  public name: string = "My Business";
  public options: Map<string, string[]> = new Map();
  public owner_uid: string = "";
  public socials: Map<string, string> = new Map();

  private _appts: Map<string, Appointment> = new Map();
  private unsub: Unsubscribe|undefined;

  constructor() { }

  public unlisten() {
    if (this.unsub) {
      this.unsub();
      this._appts = new Map();
    }
  }

  public listen(fs: Firestore, b_id: string) {
    this.unsub = onSnapshot( collection(fs, 'businesses', b_id, 'appointments'), snapshot => {
      snapshot.docChanges().forEach( change => {
        if (change.type == 'removed') {
          this._appts.delete(change.doc.id);
        }
        else {
          this._appts.set(change.doc.id, change.doc.data() as Appointment);
        }
      })
    });
  }

  get appointments(): Map<string, Appointment> {
    return this._appts
  }
}

export interface Appointment {
  customer: string,
  description: string,
  duration: number,
  options: Map<string, boolean[]>,
  timestamp: Timestamp
}