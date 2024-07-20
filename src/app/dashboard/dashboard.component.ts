import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);

  //Simple Flag to dictate dashboard view (will remove with addition of login)
  isCustomer = !false;

  /** Based on the screen size, switch from standard to one column per row */

  //Cards for the Business Dashboard
  business_cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {

        //Mobile View
        return [
          { title: 'My Services', cols: 2, rows: 1, color: "background-color: #7783EC", route: '/business/services' },
          { title: 'My Availability', cols: 2, rows: 1, color: "background-color: #28A8A8", route: '/business/availability' },
          { title: 'My Appointments', cols: 2, rows: 1, color: "background-color: #9F3E61", route: '/business/appointments'  },
          { title: 'My Business', cols: 2, rows: 1, color: "background-color: #D34D4D", route: '/business'  }
        ];
      }

      //Desktop View
      return [
        { title: 'My Services', cols: 2, rows: 1, color: "background-color: #7783EC", route: '/business/services'  },
        { title: 'My Availability', cols: 1, rows: 1, color: "background-color: #28A8A8", route: '/business/availability' },
        { title: 'My Appointments', cols: 1, rows: 2, color: "background-color: #9F3E61", route: '/business/appointments'  },
        { title: 'My Business', cols: 1, rows: 1, color: "background-color: #D34D4D", route: '/business'  }
      ];
    })
  );

  //Cards for the Customer Dashboard
  customer_cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {

        //Mobile View
        return [
          { title: 'Book an Appointment', cols: 2, rows: 1, color: "background-color: #28A8A8", route: '/search' },
          { title: 'View my Appointments', cols: 2, rows: 1, color: "background-color: #9F3E61", route: '/search' },
        ];
      }

      //Desktop View
      return [
        { title: 'Book an Appointment', cols: 2, rows: 1, color: "background-color: #28A8A8", route: '/search'  },
        { title: 'View my Appointments', cols: 2, rows: 1, color: "background-color: #9F3E61", route: '/appointments' },
        
      ];
    })
  );
}
