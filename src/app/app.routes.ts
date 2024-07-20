import { Routes } from '@angular/router';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { BusinessAppointmentsComponent } from './business-appointments/business-appointments.component';
import { BusinessAvailabilityComponent } from './business-availability/business-availability.component';
import { BusinessServicesComponent } from './business-services/business-services.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    {path: 'home', component: DashboardComponent},
    {path: 'business', component: BusinessHomeComponent},
    {path: 'business/appointments', component: BusinessAppointmentsComponent},
    {path: 'business/availability', component: BusinessAvailabilityComponent},
    {path: 'business/services', component: BusinessServicesComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];