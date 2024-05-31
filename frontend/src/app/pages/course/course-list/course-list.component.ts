import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';

// Cutsom elements imports
import { StaticRoutes } from '../../../core/routes/static.routes';
import { CourseService } from '../../../core/services/index.services';
import { Course } from '../../../core/models/index.models';
import { DurationPipe } from '../../../core/pipes/index.pipe';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DurationPipe
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  courses: Course[] = [];
  currentUser!: any;

  constructor(private courseService: CourseService) {
    this.currentUser = sessionStorage.getItem('learnxcel_access_tk');
  }

  ngOnInit(): void {
    this.getAllCourses();
  }


  // Retrive all courses)
  getAllCourses() {
    this.courseService.getAllCourses().subscribe((courses: any) => {
      this.courses = courses.data;
    });
  }
}
