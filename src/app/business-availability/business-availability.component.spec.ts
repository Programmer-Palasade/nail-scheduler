import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAvailabilityComponent } from './business-availability.component';

describe('BusinessAvailabilityComponent', () => {
  let component: BusinessAvailabilityComponent;
  let fixture: ComponentFixture<BusinessAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
