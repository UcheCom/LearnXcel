import { Routes } from '@angular/router';

// Custom elements below
import { HomeComponent } from './pages/home/home.component';
import { InstructorProfilComponent } from './pages/instructor/instructor-profil/instructor-profil.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';

export const routes: Routes = [
  // Authentification page
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      // Home Page
      { path: '', component: HomeComponent },
      // courses pages
      {
        path: 'course',
        loadChildren: () =>
          import('./pages/course/course.routes').then((m) => m.COURSE_ROUTES),
      },
      // Admin Pages
      {
        path: 'owner-admin',
        loadChildren: () =>
          import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },

      // Instructors Pages
      {
        path: 'instructor',
        loadChildren: () =>
          import('./pages/instructor/instructor.routes').then(
            (m) => m.INSTRUCTOR_ROUTES
          ),
      },

      // Students Pages
      {
        path: 'student',
        loadChildren: () =>
          import('./pages/student/student.routes').then(
            (m) => m.STUDENT_ROUTES
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
