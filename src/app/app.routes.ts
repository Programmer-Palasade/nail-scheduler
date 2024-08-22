import { Routes } from '@angular/router';
import { BusinessAppointmentsComponent } from './business-appointments/business-appointments.component';
import { BusinessAvailabilityComponent } from './business-availability/business-availability.component';
import { BusinessServicesComponent } from './business-services/business-services.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListViewerComponent } from './list-viewer/list-viewer.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { LoginComponent } from './login/login.component';
import { BusinessHomeComponent } from './business-home/business-home.component';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: BusinessHomeComponent},
    {path: 'business', component: BusinessHomeComponent},
    {path: 'business/appointments', component: BusinessAppointmentsComponent},
    {path: 'business/availability', component: BusinessAvailabilityComponent},
    {path: 'business/services', component: BusinessServicesComponent},
    {path: 'search', component: ListViewerComponent},
    {path: 'appointments', component: CustomerAppointmentsComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];