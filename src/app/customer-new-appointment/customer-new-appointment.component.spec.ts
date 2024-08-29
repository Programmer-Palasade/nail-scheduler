import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNewAppointmentComponent } from './customer-new-appointment.component';

describe('CustomerNewAppointmentComponent', () => {
  let component: CustomerNewAppointmentComponent;
  let fixture: ComponentFixture<CustomerNewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerNewAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
