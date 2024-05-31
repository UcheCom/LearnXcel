import { Component, Input } from '@angular/core';

// Custom Components
import { DashNavAdminComponent } from './dash-nav-admin/dash-nav-admin.component';
import { DashNavInstructorComponent } from './dash-nav-instructor/dash-nav-instructor.component';
import { DashNavStudentComponent } from './dash-nav-student/dash-nav-student.component';
import { User } from '../../../core/models/user';
import { StaticRoutes } from '../../../core/routes/static.routes';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-dash-nav',
  standalone: true,
  imports: [DashNavAdminComponent, DashNavInstructorComponent, DashNavStudentComponent],
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.scss'
})
export class DashNavComponent {
  staticRoutes: StaticRoutes = new StaticRoutes(); 
  accesToken: string | null;
  cUR: string | null;
  currentUser: any;
  isLogged: boolean = false;
  isStudent: boolean = false;
  isInstructor: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UsersService) {
    this.accesToken = sessionStorage.getItem('learnxcel_access_tk');
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
}
