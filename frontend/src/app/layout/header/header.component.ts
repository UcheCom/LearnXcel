import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Custom Routes
import { StaticRoutes } from '../../core/routes/static.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes(); 
  isStudent: boolean = true;
  isInstructor: boolean = false;
  isAdmin: boolean = false;
  isLogged: boolean = true;

  access_learnxcel_level = sessionStorage.getItem('access_learnxcel_level');

  constructor() { 
    if (this.access_learnxcel_level == "student") {
      this.isStudent = true;
      this.isInstructor = false;
      this.isAdmin = false;
    } else if (this.access_learnxcel_level == "instructor") {
      this.isStudent = false;
      this.isInstructor = true;
      this.isAdmin = false;
    } else if (this.access_learnxcel_level == "admin") {
      this.isStudent = false;
      this.isInstructor = false;
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
      
  }
}
