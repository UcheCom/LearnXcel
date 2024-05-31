import { Component } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';
import { StaticRoutes } from '../../../core/routes/static.routes';
import { UsersService } from '../../../core/services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-c-profile',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './c-profile.component.html',
  styleUrl: './c-profile.component.scss'
})
export class CProfileComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
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

  getCurrentUser() {}
}
