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
  staticEnv: Env = new Env();

  constructor(private http: HttpClient) {}

  COURSE_URL =  this.staticEnv.LEARNXCEL_API_URL + '/courses';

  getAllCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}/courses}`,);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}/${courseId}`,);
  }

  getAllLessonOfCourseByCourseId(courseId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.COURSE_URL}/${courseId}/lessons`,);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.COURSE_URL}`, course, );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.COURSE_URL}/${course.id}`, course, );
  }

  deleteCourseById(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}`, );
  }
}
