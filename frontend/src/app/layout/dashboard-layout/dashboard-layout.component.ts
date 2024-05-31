import { CommonModule } from '@angular/common';
import { Component, Input,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Cutom component imports below
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { DashNavComponent } from './dash-nav/dash-nav.component';
import { DashFeddbackComponent } from './dash-feddback/dash-feddback.component';
import { DashPopularInstructorComponent } from './dash-popular-instructor/dash-popular-instructor.component';
import { DashRecentCourseComponent } from './dash-recent-course/dash-recent-course.component';
import { DashChartsComponent } from './dash-charts/dash-charts.component';
import { DashStatisticsComponent } from './dash-statistics/dash-statistics.component';
import { UsersService } from '../../core/services/index.services';
import { User } from '../../core/models/index.models';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    DashHeaderComponent,
    DashNavComponent,
    DashFeddbackComponent,
    DashPopularInstructorComponent,
    DashRecentCourseComponent,
    DashChartsComponent,
    DashStatisticsComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  @Input() charts: boolean = false;
  
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
