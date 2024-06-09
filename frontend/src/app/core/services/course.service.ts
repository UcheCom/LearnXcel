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
  private COURSE_URL =  this.staticEnv.LEARNXCEL_API_URL + '/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}`, { headers: this.staticEnv.headers });
  }

  getAllPublishCourses(): Observable<any> {
    return this.http.get<any>(`${this.COURSE_URL}/publish`, { headers: this.staticEnv.headers });
  }

  getAllPendingCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}/pending`, { headers: this.staticEnv.headers });
  }

  getCourseById(courseId: any) {
    return this.http.get(`${this.COURSE_URL}/${courseId}`, { headers: this.staticEnv.headers });
  }

  /**
   * getAllLessonOfCourseByCourseId - get all lessons of a course
   * @param courseId
   * @returns
   */
  getAllLessonOfCourseByCourseId(courseId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.COURSE_URL}/${courseId}/lessons`, { headers: this.staticEnv.headers });
  }

  /**
   * getCourseByInstructorId - get all courses of an instructor
   * @param instructorId
   * @returns All courses of instructor
   */
  getCourseByInstructorId(instructorId: any) {
    return this.http.get(`${this.COURSE_URL}/instructor/${instructorId}/courses`, { headers: this.staticEnv.headers });
  }

  /**
   * Update Lesson Information
   * @param lessonId
   * @returns
   */
  updateLessonOfCourse(lessonId: number): Observable<any> {
    return this.http.put<any>(`${this.staticEnv.LEARNXCEL_API_URL}/lessons/${lessonId}`, { headers: this.staticEnv.headers });
  }
  /**
   * createCourse - create new course
   * @param course : Course body
   * @param instructorId : Instructor Id
   * @returns
   */
  createCourse(course: Course, instructorId: any): Observable<Course> {
    return this.http.post<Course>(`${this.COURSE_URL}/${instructorId}`, course, { headers: this.staticEnv.headers });
  }

  /**
   * updateCourse - update course
   * @param course
   * @returns
   */
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.COURSE_URL}/${course.courseId}`, course, { headers: this.staticEnv.headers });
  }

  updateCourseWithCourseId(course: Course, courseId: number): Observable<Course> {
    return this.http.put<Course>(`${this.COURSE_URL}/${courseId}`, course, { headers: this.staticEnv.headers });
  }

  /**
   * deleteCourseById - delete course
   * @param courseId
   * @returns
   */
  deleteCourseById(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}`, { headers: this.staticEnv.headers });
  }

  /**
   * deleteLessonById - Delete Lesson
   * @param lessonId
   * @returns
   */
  deleteLessonById(lessonId: number): Observable<any> {
    return this.http.delete<any>(`${this.staticEnv.LEARNXCEL_API_URL}/lessons/${lessonId}`, { headers: this.staticEnv.headers });
  }
}
