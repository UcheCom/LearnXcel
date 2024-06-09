import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom elements imports
import { RightSectionComponent } from './right-section/right-section.component';
import { StaticRoutes } from '../../../core/routes/static.routes';
import { NotificationService } from '../../../core/services/notification.service';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/index.models';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RightSectionComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {

  staticRoutes: StaticRoutes = new StaticRoutes();
  form!: FormGroup;
  submitted = false;
  date: Date = new Date();
  course!: Course;
  instructor: any;
  instructorId: any;
  constructor(
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly courseService: CourseService,
  ) {
    this.instructorId = sessionStorage.getItem('learnxcel_access_tk_ID');
  }

  ngOnInit() {
    this.form = this._formBuilder.group(
      {
        courseName: ['', Validators.required],
        description: ['', Validators.required],
        videoIntroUrl: [''],
        imageUrl: [''],
        startDate: ['', [Validators.required]],
        langage: ['', Validators.required],
        duration: [''],
        category: [''],
        level: ['']
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // }

    console.log(this.form.value);

    this.courseService.createCourse(this.form.value, this.instructorId).subscribe({

      next: () => {
        setTimeout(() => {
          console.log(this.form.value);
          this.notificationService.showSuccessMessage("Course ✅");
          this.router.navigateByUrl(`${this.staticRoutes.INSTRUCTOR_COURSES}`);
        }, 1300);
        this.onReset();
      },
      error: (error: any) => {
        this.notificationService.showErrorMessage("Course not created ❌");
      },
    });
  }

  get f() {
    return this.form.controls;
  }

  // get courseName() {
  //   return this.form.get('courseName') as FormControl;
  // }
  // get description() {
  //   return this.form.get('description') as FormControl;
  // }
  // get videoIntroUrl() {
  //   return this.form.get('videoIntroUrl') as FormControl;
  // }
  // get imageUrl() {
  //   return this.form.get('imageUrl') as FormControl;
  // }
  // get langage() {
  //   return this.form.get('langage') as FormControl;
  // }
  // get startDate() {
  //   return this.form.get('startDate') as FormControl;
  // }
  // get duration() {
  //   return this.form.get('duration') as FormControl;
  // }
  // get requirements() {
  //   return this.form.get('requirements') as FormControl;
  // }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
