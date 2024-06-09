import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../core/models/course';
import { StaticRoutes } from '../../../../core/routes/static.routes';
import { CourseService } from '../../../../core/services/course.service';
import { UsersService } from '../../../../core/services/users.service';
import { AuthService } from '../../../../auth/service/auth.service';

@Component({
  selector: 'app-instructor-stats',
  standalone: true,
  imports: [],
  templateUrl: './instructor-stats.component.html',
  styleUrl: './instructor-stats.component.scss'
})
export class InstructorStatsComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  publishedCourses: Course[] = [];
  pendingCourses: Course[] = [];
  allCourses: Course[] = [];
  currentUser!: any;
  myId: any = sessionStorage.getItem('learnxcel_access_tk_ID');

  constructor(private userService: UsersService,
    private authService: AuthService,
    private courseService: CourseService
  ) {
    this.userService.currentUser().subscribe((user: any) => {
      this.currentUser = user;      
    });
  }


  ngOnInit(): void {
    this.getAllInstructorCourses();
  }

  getAllInstructorCourses() {
    this.courseService.getCourseByInstructorId(this.myId).subscribe((courses: any) => {
      this.allCourses = courses;

      this.allCourses.forEach((course: any) => {
        if (course.published === true) {
          this.publishedCourses.push(course);
        } else {
          this.pendingCourses.push(course);
        }
      })
    });
  }
}
