import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { StaticRoutes } from '../../../core/routes/static.routes';

// Custom imports below
import { GlobalConsts } from '../../../core/utils/vars-consts';
import { Course, Lesson } from '../../../core/models/index.models';
import {
  CourseService,
  UsersService,
} from '../../../core/services/index.services';

@Component({
  selector: 'app-c-profile-view-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './c-profile-view-details.component.html',
  styleUrl: './c-profile-view-details.component.scss',
})
export class CProfileViewDetailsComponent {
  staticRoutes: StaticRoutes = new StaticRoutes();
  isInstructor: boolean = true;
  globalConstants: GlobalConsts = new GlobalConsts();
  pageTitle?: string;
  lessons: Lesson[] = [];
  course!: Course[];
  userDetails!: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private courseService: CourseService,
    private userSerice: UsersService
  ) {}

  ngOnInit(): void {
    this.getCourseByInstructorId();
  }

  getCourseByInstructorId() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const userId = p.get('userId');
      this.userSerice.getUserById(userId).subscribe((res: any) => {
        this.userDetails = res;
      });
    });
  }

  getCurrenUser() {
    this.activatedRoute.paramMap.subscribe((p: any) => {
      const userId = p.get('userId');
      this.courseService
        .getCourseByInstructorId(userId)
        .subscribe((res: any) => {
          this.course = res;
        });
    });
  }

  findUserDetailsByUserId(userId: any) {
    this.userSerice.getUserById(userId).subscribe((res: any) => {
      return res;
    });
  }
}
