import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
