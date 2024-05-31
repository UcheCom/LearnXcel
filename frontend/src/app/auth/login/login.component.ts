import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../service/auth.service';
import { Auth } from '../../core/models/index.models';
import { StaticRoutes } from '../../core/routes/static.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
  showPassword: string = 'password';
  show = false;

  form!: UntypedFormGroup;
  isLoggedIn = false;
  isLogginFailled = false;
  errorMessage = '';
  roles: string[] = [];

  invalidLogin = false;
  loginModel = {
    email: '',
    password: '',
  };
  CustomControler: any;
  isRequesting: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder // private readonly commonService: CommonService,
  ) {}

  ngOnInit() {
    this.creatSignInForm();
  }

  creatSignInForm() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.form = this.formBuilder.group({
      email: ['', [Validators.pattern(emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
  emailErrors() {
    return this.email.hasError('pattern') ? "Cet email n'est pas valide" : '';
  }
  submit() {
    this.isRequesting = true;
    this.auth.login(this.loginModel).subscribe((res: any) => {
      // @ts-ignore
      // sessionStorage.token = res.token;
      // () => {
      const userRoles = res.user.roles[0];

      sessionStorage.setItem('s-learn-xcel-r', userRoles);
      sessionStorage.setItem('learnxcel_access_tk', res.accessToken);

      const rolesName = res.user.roles.map((role: any) => role.name);
      const rolesId = res.user.roles.map((role: any) => role.id);
      sessionStorage.setItem('s-learn-xcel-r', userRoles);

      const array1 = Math.floor(Math.random() * 999999999999999);
      const array2 = Math.floor(Math.random() * 999999999999999);

      sessionStorage.setItem('fy-embr-learn-xcel-r', array1 + rolesId + array2);
      sessionStorage.setItem('response', res.status);
      this.isLoggedIn = true;
      sessionStorage.setItem('fuckYou', 'true');

      //success msg
      setTimeout(() => {
        if (
          res.user.email != null &&
          (userRoles == 'ROLE_STUDENT' || userRoles == 'role_student')
        ) {
          this.router.navigateByUrl('/student/dashboard');
          setTimeout(() => {
            // window.location.reload();
          }, 1500);
          this.showSuccessMessage(res.user.displayName);
        } else if (
          res.user.email != null &&
          (userRoles == 'ROLE_INSTRUCTOR' || userRoles == 'role_instructor')
        ) {
          this.router.navigateByUrl('/instructor/dashboard');
          setTimeout(() => {
            // window.location.reload();
          }, 1500);
          this.showSuccessMessage(res.user.displayName);
        } else if (
          res.user.email != null &&
          (userRoles == 'ROLE_ADMIN' || userRoles == 'role_admin')
        ) {
          this.router.navigateByUrl('/admin/dashboard');
          setTimeout(() => {
            // window.location.reload();
          }, 1500);
          this.showSuccessMessage(res.user.displayName);
        } else {
          this.router.navigateByUrl('/');
        }
      }, 3100);
      setTimeout(() => {
        this.isRequesting = false;
      }, 1500);

      // },
      (err: any) => {
        // Error msg
        setTimeout(() => {
          this.isRequesting = false;
          this.showErorMessage();
          setTimeout(() => {}, 300);
          this.badCredentials();
        }, 1100);
      };
    });
  }

  /**
   * badCredentials : Message for bad credentials
   * @return Nothing
   */
  badCredentials() {
    Swal.fire({
      icon: 'error',
      title: 'Oops... !',
      timer: 3000,
      text: 'Bad credentials !',
    });
  }

  showSuccessMessage(username: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `Welcome back 🖐🏽 ${username}`,
      timer: 5000,
    });
  }

  showErorMessage(username?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `Identifiants incorrects ❌`,
      timer: 5000,
    });
  }

  /**
   * onClick - Show or hide password
   * @return Nothing
   */
  onClick() {
    if (this.showPassword === 'password') {
      this.showPassword = 'text';
      this.show = true;
    } else {
      this.showPassword = 'password';
      this.show = false;
    }
  }
}
