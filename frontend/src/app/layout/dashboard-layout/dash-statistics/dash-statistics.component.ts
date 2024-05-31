import { Component } from '@angular/core';

// Custom elements imports
import { AdminStatsComponent } from './admin-stats/admin-stats.component';
import { InstructorStatsComponent } from './instructor-stats/instructor-stats.component';
import { StudentStatsComponent } from './student-stats/student-stats.component';
import { User } from '../../../core/models/index.models';
import { UsersService } from '../../../core/services/index.services';

@Component({
  selector: 'app-dash-statistics',
  standalone: true,
  imports: [
    AdminStatsComponent,
    InstructorStatsComponent,
    StudentStatsComponent
  ],
  templateUrl: './dash-statistics.component.html',
  styleUrl: './dash-statistics.component.scss'
})
export class DashStatisticsComponent {
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
