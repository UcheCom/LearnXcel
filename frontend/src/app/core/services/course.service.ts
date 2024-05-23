import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Custom Imports
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Course, Lesson } from '../models/index.models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  COURSE_URL = environment.LEARNXCEL_API_URL + '/courses';

  getAllCourses(): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}`, { headers: environment.headers });
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.COURSE_URL}/${courseId}`, { headers: environment.headers });
  }

  getAllLessonOfCourseByCourseId(courseId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.COURSE_URL}/${courseId}/lessons`, { headers: environment.headers });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.COURSE_URL}`, course, { headers: environment.headers });
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.COURSE_URL}/${course.id}`, course, { headers: environment.headers });
  }

  deleteCourseById(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.COURSE_URL}/${courseId}`, { headers: environment.headers });
  }
}