import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {

        //Mobile View
        return [
          { title: 'My Services', cols: 2, rows: 1, color: "background-color: #7783EC" },
          { title: 'My Availability', cols: 2, rows: 1, color: "background-color: #28A8A8"},
          { title: 'My Appointments', cols: 2, rows: 1, color: "background-color: #9F3E61" },
          { title: 'My Business', cols: 2, rows: 1, color: "background-color: #D34D4D" }
        ];
      }

      //Desktop View
      return [
        { title: 'My Services', cols: 2, rows: 1, color: "background-color: #7783EC" },
        { title: 'My Availability', cols: 1, rows: 1, color: "background-color: #28A8A8"},
        { title: 'My Appointments', cols: 1, rows: 2, color: "background-color: #9F3E61" },
        { title: 'My Business', cols: 1, rows: 1, color: "background-color: #D34D4D" }
      ];
    })
  );
}
