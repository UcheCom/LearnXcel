import { Routes } from '@angular/router';

// Only Custom elements
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListByCategoryComponent } from './course-list-by-category/course-list-by-category.component';
import { StaticRoutes } from '../../core/routes/static.routes';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseLessonDetailsComponent } from './course-lesson-details/course-lesson-details.component';

export const COURSE_ROUTES: Routes = [
  { path: '', component: CourseListComponent },
  { path: ':courseId/details', component: CourseDetailsComponent, title: 'LearnXcel | Course Details' },
  { path: ':courseId/details/lesson/:lessonId/details', component: CourseLessonDetailsComponent, title: 'LearnXcel | Lesson Details' },

  // Not yet used
  { path: 'list-by-category', component: CourseListByCategoryComponent },
  { path: ':courseId/:courseTitle', component: CourseListByCategoryComponent },

  // When any routes is not found, redirect to home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
