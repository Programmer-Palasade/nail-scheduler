import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Business, FirestoreService } from '../shared/firestore.service';
import {MatTabsModule} from '@angular/material/tabs';
import { BusinessInfoComponent } from "../business-info/business-info.component";
import { BusinessServicesComponent } from "../business-services/business-services.component";
import { BusinessAvailabilityComponent } from "../business-availability/business-availability.component";

@Component({
  selector: 'app-business-home',
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, CommonModule, FormsModule, MatButtonModule, MatCardModule, MatIconModule, MatIconModule, MatDividerModule, MatSlideToggleModule, MatFormFieldModule, BusinessInfoComponent, BusinessServicesComponent, BusinessAvailabilityComponent],
  templateUrl: './business-home.component.html',
  styleUrl: './business-home.component.scss'
})
export class BusinessHomeComponent implements OnInit{
  firestore = inject(FirestoreService);

  business: Business = new Business();
  constructor(){

  }

  ngOnInit(): void {
    this.firestore.get_business('test_business1').then(
      value => {
        console.log(value);//this.business.name = value.name;
      }
    );
  }

  update_name(name: string) {
    this.business.name = name;
  }
}
