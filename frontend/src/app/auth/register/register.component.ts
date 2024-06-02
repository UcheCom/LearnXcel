import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';

// Custom elements imports below
import { StaticRoutes } from '../../core/routes/static.routes';
import { AuthService } from '../service/auth.service';
import { Student } from '../../core/models/index.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  form!: FormGroup;
  isSaving = false;
  student!: Student;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: UntypedFormBuilder
  ) {

  }

  ngOnInit(): void {
      this.registrationForm();
  }
  registrationForm() {
    this.form = this._formBuilder.group({
      name: [''],
      email: [''],
      username: [''],
      displayName: [''],
      password: [''],
      matchingPassword: ['']
    })
  }
}
