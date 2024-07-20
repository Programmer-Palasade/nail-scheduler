import { inject, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { collection, doc, docData, Firestore, getDoc, onSnapshot, Timestamp, Unsubscribe } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnDestroy {
  private fs = inject(Firestore);
  private auth = inject(AuthService);

  private businesses: Map<string, Business> = new Map();

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
    let b = await getDoc( doc(this.fs, 'businesses', business_id) ).then( snapshot => {
      if (snapshot.exists()) {
        let b = snapshot.data() as Business;
        b.listen(this.fs, business_id);
        return b;
      }
      return new Business;
    });
    this.businesses.set(business_id, b);
    return b;
  }
}


export class Business {
  public availability: Map<number, number[]> = new Map().set(0, [0, 2359]).set(1, [0, 2359]).set(2, [0, 2359]).set(3, [0, 2359]).set(4, [0, 2359]).set(5, [0, 2359]).set(6, [0, 2359]);
  public icon: string = "";
  public name: string = "My Business";
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
        this._appts.delete(change.doc.id);
        if (change.type != 'removed') {
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
  duration: number,
  timestamp: Timestamp
}