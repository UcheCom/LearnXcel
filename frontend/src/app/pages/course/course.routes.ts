import { Routes } from '@angular/router';

// Only Custom elements
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListByCategoryComponent } from './course-list-by-category/course-list-by-category.component';

export const COURSE_ROUTES: Routes = [
  { path: '', component: CourseCategoryComponent },
  { path: 'list', component: CourseListComponent },
  { path: 'list-by-category', component: CourseListByCategoryComponent },
  { path: ':courseId/:courseTitle', component: CourseListByCategoryComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' }
];
