import { Routes } from '@angular/router';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { BusinessAppointmentsComponent } from './business-appointments/business-appointments.component';
import { BusinessAvailabilityComponent } from './business-availability/business-availability.component';
import { BusinessServicesComponent } from './business-services/business-services.component';


export const routes: Routes = [
    {path: 'business', component: BusinessHomeComponent},
    {path: 'campaigns/:c_id/:w_id', component: BusinessAppointmentsComponent},
    {path: 'campaigns/:c_id', component: BusinessAvailabilityComponent},
    {path: 'campaigns', component: BusinessServicesComponent}
];