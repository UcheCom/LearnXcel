import { Routes } from '@angular/router';
import { InstructorProfilComponent } from './instructor-profil/instructor-profil.component';

export const INSTRUCTOR_ROUTES: Routes = [
  { path: 'profil', component: InstructorProfilComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
