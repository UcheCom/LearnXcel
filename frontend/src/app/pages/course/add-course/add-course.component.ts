import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Custom elements imports
import { RightSectionComponent } from './right-section/right-section.component';
import { StaticRoutes } from '../../../core/routes/static.routes';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RightSectionComponent
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
  staticRoutes: StaticRoutes = new StaticRoutes()
}
