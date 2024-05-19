export class StaticRoutes {
  private basePath: string = '';

  // Home page
  HOME: string = `${this.basePath}`;

  private admin: string = `${this.basePath}/owner/admin`;
  private instructor: string = `${this.basePath}/instructor`;
  private student: string = `${this.basePath}/student`;

  // ADMIN ROUTES
  ADMIN_HOME: string = `${this.admin}/dashboard`;
  ADMIN_PROFILE: string = `${this.admin}/profile`;
  ADMIN_COURSES: string = `${this.admin}/courses`;
  ADMIN_REVIEWS: string = `${this.admin}/reviews`;
  ADMIN_SETTINGS: string = `${this.admin}/settings`;

  // INSTRUCTOR ROUTES
  INSTRUCTOR_HOME: string = `${this.instructor}/dashboard`;
  INSTRUCTOR_PROFILE: string = `${this.instructor}/profile`;
  INSTRUCTOR_COURSES: string = `${this.instructor}/courses`;
  INSTRUCTOR_QUIZ: string = `${this.instructor}/quiz`;
  INSTRUCTOR_REVIEW: string = `${this.instructor}/reviews`;
  INSTRUCTOR_SETTINGS: string = `${this.instructor}/settings`;

  // STUDENT ROUTES
  STUDENT_HOME: string = `${this.student}/dashboard`;
  STUDENT_PROFILE: string = `${this.student}/profile`;
  STUDENT_COURSES: string = `${this.student}/courses`;
  STUDENT_QUIZ: string = `${this.student}/quiz`;
  STUDENT_REVIEW: string = `${this.student}/reviews`;
  STUDENT_SETTINGS: string = `${this.student}/settings`;

}