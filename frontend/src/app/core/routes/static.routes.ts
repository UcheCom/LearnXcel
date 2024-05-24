import { HttpHeaders } from "@angular/common/http";

export class StaticRoutes {
  private basePath: string = '';  
  private auth: string = `${this.basePath}/authentification`;
  private admin: string = `${this.basePath}/owner/admin`;
  private instructor: string = `${this.basePath}/instructor`;
  private student: string = `${this.basePath}/student`;

  // production?: boolean = false;
  // LEARNXCEL_API_URL: string = 'http://{HOST}:{PORT}/{ROUTE_BASE}';
  // headers: HttpHeaders = new HttpHeaders({
  //   Authorization: 'Bearer ' + sessionStorage.getItem('learnxcel_access_tk'),
  // });

  // GLOBAL ROUTES
  HOME: string = `${this.basePath}`;
  COURSES: string = `${this.basePath}/courses`;
  COURSES_NEW: string = `${this.basePath}/courses/new`;
  QUIZ: string = `${this.basePath}/quiz`;
  TEAM: string = `${this.basePath}/team`;
  CONTACT: string = `${this.basePath}/contact`;
  
  // AUTH ROUTES
  AUTH: string = `${this.auth}`;

  // ADMIN ROUTES
  ADMIN_DASHBOARD: string = `${this.admin}/dashboard`;
  ADMIN_PROFILE: string = `${this.admin}/profile`;
  ADMIN_COURSES: string = `${this.admin}/courses`;
  ADMIN_REVIEWS: string = `${this.admin}/reviews`;
  ADMIN_SETTINGS: string = `${this.admin}/settings`;

  // INSTRUCTOR ROUTES
  INSTRUCTOR_DASHBOARD: string = `${this.instructor}/dashboard`;
  INSTRUCTOR_PROFILE: string = `${this.instructor}/profile`;
  INSTRUCTOR_COURSES: string = `${this.instructor}/courses`;
  INSTRUCTOR_QUIZ: string = `${this.instructor}/quiz`;
  INSTRUCTOR_REVIEW: string = `${this.instructor}/reviews`;
  INSTRUCTOR_SETTINGS: string = `${this.instructor}/settings`;

  // STUDENT ROUTES
  STUDENT_DASHBOARD: string = `${this.student}/dashboard`;
  STUDENT_PROFILE: string = `${this.student}/profile`;
  STUDENT_COURSE_LIST: string = `${this.student}/course`;
  STUDENT_QUIZ: string = `${this.student}/quiz`;
  STUDENT_REVIEW: string = `${this.student}/reviews`;
  STUDENT_SETTINGS: string = `${this.student}/settings`;

}
