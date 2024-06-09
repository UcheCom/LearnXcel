import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../core/models/course';
import { StaticRoutes } from '../../../../core/routes/static.routes';
import { CourseService } from '../../../../core/services/course.service';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-admin-stats',
  standalone: true,
  imports: [],
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.scss'
})
export class AdminStatsComponent implements OnInit {
  
  staticRoutes: StaticRoutes = new StaticRoutes();
  publishedCourses: Course[] = [];
  pendingCourses: Course[] = [];
  allCourses: Course[] = [];
  currentUser!: any;

  constructor(
    private courseService: CourseService,
    private userService: UsersService
  ) {
    this.currentUser = sessionStorage.getItem('learnxcel_access_tk');
  }

  ngOnInit(): void {
    this.getPublishCourses();
    this.getPendingCourses();
    this.getAllCourses();
  }

  getPublishCourses() {
    this.courseService.getAllPublishCourses().subscribe((courses: any) => {
      this.publishedCourses = courses.data;
    });
  }
  getPendingCourses() {
    this.courseService.getAllPendingCourses().subscribe((courses: any) => {
      this.pendingCourses = courses.data;
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe((courses: any) => {
      this.allCourses = courses.data;
    });
  }

}
