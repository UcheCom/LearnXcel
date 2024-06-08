import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Custom elements imports below
import { AuthService } from '../../../auth/service/auth.service';
import { StaticRoutes } from '../../../core/routes/static.routes';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-new-instructor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-instructor.component.html',
  styleUrl: './new-instructor.component.scss'
})
export class NewInstructorComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
  form!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group(
      {
        displayName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        matchingPassword: ['', Validators.required],
        // acceptTerms: [false, Validators],
        about: [''],
      },
      {
        validator: this.mustMatch('password', 'matchingPassword'),
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  get displayName() {
    return this.form.get('displayName') as FormControl;
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get matchingPassword() {
    return this.form.get('matchingPassword') as FormControl;
  }
  get about() {
    return this.form.get('about') as FormControl;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.registerInstructor(this.form.value).subscribe({
      next: () => {
        console.log('Form Data:', this.form.value);
        setTimeout(() => {
          this.notificationService.showSuccessMessage(this.form.value.displayName);
          this.router.navigateByUrl('/auth/signin');
        }, 900);
        this.onReset();
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showErrorMessage(error);
      },
    });
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  /**
   * Check if two password match
   * @param password first password
   * @param matchingPassword repeted password
   */
  mustMatch(password: string, matchingPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[matchingPassword];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
