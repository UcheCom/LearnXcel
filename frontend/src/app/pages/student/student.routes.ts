import { Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';

export const STUDENT_ROUTES: Routes = [
  { path: '', component: StudentProfileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
