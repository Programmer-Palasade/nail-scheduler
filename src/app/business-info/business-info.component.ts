import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.scss'
})
export class BusinessInfoComponent {
business: string = "Jane's Business";

}
