import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

// Custom elements imports
import { StaticRoutes } from '../../../core/routes/static.routes';
import { Course, Lesson } from '../../../core/models/index.models';
import { CourseService } from '../../../core/services/index.services';
import { GlobalConsts } from '../../../core/utils/vars-consts';
import { DurationPipe } from '../../../core/pipes/index.pipe';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    DurationPipe
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes();
  globalConstants: GlobalConsts = new GlobalConsts();
  courseTitle?: string;
  lessons: Lesson[] = [];
  course!: Course;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCurrentCourseDetailsByCourseId();
    this.getCourseByInstructorId();
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
   * Updates the title of the page
   * @param {string} courseId : Title of course
   * @returns {void}
   */
  updateTitle(courseTitle?: String): void {
    const currentTitle = `${this.globalConstants?.learnXcel} - ${courseTitle}`;
    this.titleService.setTitle(currentTitle);
  }

  getCourseByCourseId(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.course = res;
    });
  }
}
