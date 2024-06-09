import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/index.services';

@Component({
  selector: 'app-my-course-list',
  standalone: true,
  imports: [],
  templateUrl: './my-course-list.component.html',
  styleUrl: './my-course-list.component.scss'
})
export class MyCourseListComponent implements OnInit {

  constructor(
    private readonly courseService: CourseService
  ) { }

  ngOnInit(): void {

  }

  
}
