import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { StaticRoutes } from '../../../core/routes/static.routes';
import { UsersService } from '../../../core/services/index.services';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-dash-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss',
})
export class DashHeaderComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
  @Input() userName: string = 'Alain Gouba';
  @Input() instructorImageUrl: string = 'assets/img/teacher/default_teacher.jpg';
  studentImageUrl: string = 'assets/img/teacher/default_student.jpg';
  @Input() starRating: number = 0;
  @Input() reviewsCount: number = 0;
  @Input() createCourseLink: string = 'create-course';

  cUR: string | null;
  currentUser: any;
  isLogged: boolean = false;
  isStudent: boolean = false;
  isInstructor: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UsersService,
    private authService: AuthService
  ) {
    this.cUR = sessionStorage.getItem('s-learn-xcel-r');

    this.userService.currentUser().subscribe((user: any) => {
      this.currentUser = user;
    });

    if (this.cUR != null) {
      const roles = this.cUR.toLowerCase();
      if (roles.includes('role_student') || roles.includes('student')) {
        this.isLogged = true;
        this.isStudent = true;
      } else if (roles.includes('role_instructor') || roles.includes('instructor')) {
        this.isLogged = true;
        this.isInstructor = true;
      } else if (roles.includes('role_admin') || roles.includes('admin')) {
        this.isLogged = true;
        this.isAdmin = true;
      }
    }
  }

  ngOnInit(): void {}
}
