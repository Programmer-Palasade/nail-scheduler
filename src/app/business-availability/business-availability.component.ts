import { Component, inject, Input, OnInit } from '@angular/core';
import { Business } from '../shared/firestore.service';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-availability.component.html',
  styleUrls: ['./business-availability.component.scss']
})
export class BusinessAvailabilityComponent implements OnInit {
  auth = inject(AuthService);
@Input() business!: Business;
  availability: Availability[] = [];
  editingDay: string | null = null; // Track the day currently being edited
  newHours: string = '';

  ngOnInit(): void {
    // Example data, replace with actual data fetching logic
    this.availability = [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ];
  }

  startEditing(day: string, hours: string): void {
    this.editingDay = day;
    this.newHours = hours;
  }

  saveEdit(day: string): void {
    const index = this.availability.findIndex(slot => slot.day === day);
    if (index !== -1) {
      this.availability[index].hours = this.newHours;
      this.editingDay = null;
      this.newHours = '';
    }
  }

  cancelEdit(): void {
    this.editingDay = null;
    this.newHours = '';
  }
}

export interface Availability {
  day: string;
  hours: string;
}