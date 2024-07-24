import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-customer-appointments',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatGridListModule],
  templateUrl: './customer-appointments.component.html',
  styleUrl: './customer-appointments.component.scss'
})
export class CustomerAppointmentsComponent {

}
