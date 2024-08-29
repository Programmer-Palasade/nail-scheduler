import { Component, inject, Input, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Business, FirestoreService } from '../shared/firestore.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';0
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Pipe({
  standalone: true,
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any) {
    if (value instanceof Array) {return 'array';}
    return typeof(value);
  }

}

@Component({
  selector: 'app-customer-new-appointment',
  standalone: true,
  imports: [TypeofPipe, ReactiveFormsModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, NgxMatTimepickerModule],
  templateUrl: './customer-new-appointment.component.html',
  styleUrl: './customer-new-appointment.component.scss'
})
export class CustomerNewAppointmentComponent {

  public business!: Business;
  @Input()
  set _business(b: Business) {
    this.business = b;
    this.options = this.build_options_form();
  }
  private readonly _formBuilder = inject(FormBuilder);
  public options: Map<string, FormGroup> = new Map();
  public customer = "";
  public description = this._formBuilder.control("");
  public timestamp = this._formBuilder.control(new Date());

  public build_options_form(): Map<string, FormGroup> {
    let output: Map<string, FormGroup> = new Map();
    for (let opt of this.business.options) {
      let opt_name = opt[0];
      let opt_choices = opt[1];
      let selections: Map<string, Array<boolean>> = new Map();
      for (let ch in opt_choices) {
        selections.set(ch, [false]);
      }
      output.set(opt_name, this._formBuilder.group(selections));
    }
    return output;
  }
  constructor() {
  }

}
