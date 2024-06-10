import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Custom Imports
import { Observable } from 'rxjs';
import { Course, Lesson } from '../models/index.models';
import { Env } from '../../../environments/env';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private staticEnv: Env = new Env();
  private COURSE_URL = this.staticEnv.LEARNXCEL_API_URL + '/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}`, {
      headers: this.staticEnv.headers,
    });
  }

  getAllPublishCourses(): Observable<any> {
    return this.http.get<any>(`${this.COURSE_URL}/publish`, {
      headers: this.staticEnv.headers,
    });
  }

  getAllPendingCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}/pending`, {
      headers: this.staticEnv.headers,
    });
  }

  getCourseById(courseId: any) {
    return this.http.get(`${this.COURSE_URL}/${courseId}`, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * getAllLessonOfCourseByCourseId - get all lessons of a course
   * @param courseId
   * @returns
   */
  getAllLessonOfCourseByCourseId(courseId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.COURSE_URL}/${courseId}/lessons`, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * getCourseByInstructorId - get all courses of an instructor
   * @param instructorId
   * @returns All courses of instructor
   */
  getCourseByInstructorId(instructorId: any) {
    return this.http.get(
      `${this.COURSE_URL}/instructor/${instructorId}/courses`,
      { headers: this.staticEnv.headers }
    );
  }

  /**
   * getCourseByStudentId - get all courses of a student
   * @param instructorId
   * @returns All courses of instructor
   */
  getCourseByStudentId(instructorId: any) {
    return this.http.get(`${this.COURSE_URL}/student/${instructorId}/courses`, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * Update Lesson Information
   * @param lessonId
   * @returns
   */
  updateLessonOfCourse(lessonId: number): Observable<any> {
    return this.http.put<any>(
      `${this.staticEnv.LEARNXCEL_API_URL}/lessons/${lessonId}`,
      { headers: this.staticEnv.headers }
    );
  }
  /**
   * createCourse - create new course
   * @param course : Course body
   * @param instructorId : Instructor Id
   * @returns
   */
  createCourse(course: Course, instructorId: any): Observable<Course> {
    return this.http.post<Course>(
      `${this.COURSE_URL}/${instructorId}`,
      course,
      { headers: this.staticEnv.headers }
    );
  }

  /**
   * Enrolls a student in a course.
   *
   * @param {Course} course - The course to enroll the student in.
   * @param {any} studentId - The ID of the student to enroll.
   * @return {Observable<any>} An observable that emits the result of the enrollment operation.
   */
  enrollStudent(courseId: number, studentId: number): Observable<any> {
    return this.http.post<any>(
      `${this.COURSE_URL}/${courseId}/enroll/${studentId}`,
      { headers: this.staticEnv.headers }
    );
  }

  /**
   * Unenrolls a student from a course.
   *
   * @param {Course} courseId - The ID of the course from which the student should be unenrolled.
   * @param {any} studentId - The ID of the student to be unenrolled.
   * @return {Observable<any>} An Observable that emits the result of the unenrollment operation.
   */
  unenrollStudent(courseId: Course, studentId: any): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}/unenroll/${studentId}`, {
      headers: this.staticEnv.headers,
    });
  }

/**
 * Adds a course to the favorites of a student.
 *
 * @param {Course} courseId - The ID of the course to be added.
 * @param {any} studentId - The ID of the student.
 * @return {Observable<any>} An observable that emits the result of the operation.
 */
  addFavorisCourse(courseId: Course, studentId: any): Observable<any> {
    return this.http.post<any>(`${this.COURSE_URL}/${courseId}/favoris/${studentId}`, {
      headers: this.staticEnv.headers,
    });
  }

/**
 * Removes a course from the favorites of a student.
 *
 * @param {number} courseId - The ID of the course to be removed.
 * @param {number} studentId - The ID of the student.
 * @return {Observable<any>} An observable that emits the result of the operation.
 */
  removeFavorisCourse(courseId: number, studentId: number): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}/favoris/${studentId}`, {
      headers: this.staticEnv.headers,
    });
  }

  getAllFavoritesByStudent(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.COURSE_URL}/favoris/${studentId}/courses`, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * updateCourse - update course
   * @param course
   * @returns
   */
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${this.COURSE_URL}/${course.courseId}`,
      course,
      { headers: this.staticEnv.headers }
    );
  }

  /**
   * Updates a course with the given course ID.
   *
   * @param {Course} course - The course object containing the updated information.
   * @param {number} courseId - The ID of the course to be updated.
   * @return {Observable<Course>} An observable that emits the updated course.
   */
  updateCourseWithCourseId(
    course: Course,
    courseId: number
  ): Observable<Course> {
    return this.http.put<Course>(`${this.COURSE_URL}/${courseId}`, course, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * deleteCourseById - delete course
   * @param courseId
   * @returns
   */
  deleteCourseById(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}`, {
      headers: this.staticEnv.headers,
    });
  }

  /**
   * deleteLessonById - Delete Lesson
   * @param lessonId
   * @returns
   */
  deleteLessonById(lessonId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.staticEnv.LEARNXCEL_API_URL}/lessons/${lessonId}`,
      { headers: this.staticEnv.headers }
    );
  }
}
