import { Component, inject } from '@angular/core';
import { Appointment, Business, FirestoreService } from '../shared/firestore.service';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-business-appointments',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule],
  templateUrl: './business-appointments.component.html',
  styleUrl: './business-appointments.component.scss'
})
export class BusinessAppointmentsComponent {

  public firestore = inject(FirestoreService);

  /*public highlight_function: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view == 'month') {
      const month = cellDate.getMonth();
      const date = cellDate.getDate();

      let d_filter = (appt: Appointment) => {
        let appt_d = appt.timestamp.toDate();
        return (appt_d.getMonth() == month && appt_d.getDate() == date);
      }
      let num_appts = [...this.business.appointments.values()].filter(d_filter).length;

      if (num_appts >= 5) { return 'dark-highlight-class'; }
      if (num_appts > 0) { return 'light-highlight-class'; }
    }

    return '';
  }
  public filter_function = (d: Date|null): boolean => {
    const day = (d || new Date()).getDay();
    return (this.business.availability.get(day)?.length ?? 0) > 0;
  }
  */
  private readonly _today = new Date();
  public min_date = this._today;

  constructor() { }

  get business(): Business {
    return this.firestore.businesses.get('test_business1') ?? new Business();
  }
}
