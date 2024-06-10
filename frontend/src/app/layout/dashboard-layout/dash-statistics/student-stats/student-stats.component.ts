import { Component, OnInit } from '@angular/core';
import { StaticRoutes } from '../../../../core/routes/static.routes';
import { AuthService } from '../../../../auth/service/auth.service';
import { Course } from '../../../../core/models/course';
import { CourseService } from '../../../../core/services/course.service';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-student-stats',
  standalone: true,
  imports: [],
  templateUrl: './student-stats.component.html',
  styleUrl: './student-stats.component.scss'
})
export class StudentStatsComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  followingCourses: Course[] = [];
  completedCourses: Course[] = [];
  allCourses: Course[] = [];
  favoriteCourses: Course[] = [];
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
    this.getAllStudentCourses();
    this.getAllStudentFavoritesCourses();
  }

  getAllStudentCourses() {
    this.courseService.getCourseByStudentId(this.myId).subscribe((courses: any) => {
      this.allCourses = courses;

      this.allCourses.forEach((course: any) => {
        if (course.published === true && course.completed === true) {
          this.completedCourses.push(course);
        } else {
          this.followingCourses.push(course);
        }
      })
    });
  }

  getAllStudentFavoritesCourses() {
    this.courseService.getAllFavoritesByStudent(this.myId).subscribe((courses: any) => {
      this.favoriteCourses = courses;
    });
  }
}
