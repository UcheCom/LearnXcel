import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

// Custom elements imports
import { StaticRoutes } from '../../../core/routes/static.routes';
import { Course, Lesson } from '../../../core/models/index.models';
import {
  CourseService,
  NotificationService,
} from '../../../core/services/index.services';
import { GlobalConsts } from '../../../core/utils/vars-consts';
import { DurationPipe } from '../../../core/pipes/index.pipe';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule, CommonModule, DurationPipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  globalConstants: GlobalConsts = new GlobalConsts();
  courseTitle?: string;
  lessons: Lesson[] = [];
  course!: Course;
  studentCourses: Course[] = [];
  enrollmentState: boolean = false;
  myId: any = sessionStorage.getItem('learnxcel_access_tk_ID');

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCurrentCourseDetailsByCourseId();
    this.getCourseByInstructorId();
    this.getAllStudentCourses();
  }

  /**
   * onEnrollToCourse: Enroll a student to course
   */
  onEnrollToCourse() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const courseId = p.get('courseId');
      this.courseService.enrollStudent(courseId, this.myId).subscribe(() => {
        setTimeout(
          () =>
            this.notificationService.showSuccessMessage(
              'Enrolled successfully'
            ),
          400
        );
        this.enrollmentState = true;
      });
    });
  }

  /**
   * onUnEnrollToCourse: UnEnroll a student from course
   */
  onUnEnrollToCourse() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const courseId = p.get('courseId');
      Swal.fire({
        title: "Do you want to UnEnrollment of this course?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `Don't UnEnrollment`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.courseService.unenrollStudent(courseId, this.myId).subscribe(() => {
            setTimeout(
              () => this.notificationService.showSuccessMessage('UnEnrollment'),
              400
            );
            this.enrollmentState = false;
          });
        } else if (result.isDenied) {
          
        }
      });
      
    });
  }

  getAllStudentCourses() {
    this.courseService
      .getCourseByStudentId(this.myId)
      .subscribe((courses: any) => {
        this.studentCourses = courses;

        this.studentCourses.forEach((course: any) => {
          if (this.course.courseId == course.courseId) {
            this.enrollmentState = true;
          } else {
            this.enrollmentState = false;
          }
        });
      });
  }

  getCourseByInstructorId() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const instructorId = p.get('instructorId');
      this.courseService
        .getCourseByInstructorId(instructorId)
        .subscribe((res: any) => {
          this.course = res;
        });
    });
  }

  /**
   * Retrieves a course by its ID and updates the component's course property.
   *
   * @param {number} courseId - The ID of the course to retrieve.
   * @return {void} anything.
   */
  getCurrentCourseDetailsByCourseId() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const courseId = p.get('courseId');
      this.courseService.getCourseById(courseId).subscribe((res: any) => {
        this.course = res;
        this.updateTitle(this.course?.courseName);
      });
    });
  }

  /**
   * Retrieves a course by its ID and updates the component's course property.
   *
   * @param {number} courseId - The ID of the course to retrieve.
   * @return {void} nothing is returned
   */
  getCourseByCourseId(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.course = res;
    });
  }

  /**
   * Updates the title of the page
   * @param {string} courseId : Title of course
   * @returns {void}
   */
  updateTitle(courseTitle?: String): void {
    const currentTitle = `${this.globalConstants?.learnXcel} - ${courseTitle}`;
    this.titleService.setTitle(currentTitle);
  }
}
