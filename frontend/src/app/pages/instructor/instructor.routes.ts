import { Routes } from '@angular/router';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';

export const INSTRUCTOR_ROUTES: Routes = [
  { path: 'profile', component: InstructorProfileComponent },
  { path: 'dashboard', component: InstructorDashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
