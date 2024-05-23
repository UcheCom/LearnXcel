import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Custom elements imports
import { StaticRoutes } from '../../../core/routes/static.routes';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  staticRoutes: StaticRoutes = new StaticRoutes(); 

  courseId!: string;

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.updateTitle(this.courseId);
    });
  }


  /**
   * Updates the title of the page
   * @param {string} courseId : Id of course
   * @returns {void}
   */
  updateTitle(courseId: string): void {
    const newTitle = `LearnXcel | ${courseId} Course Details`;
    this.titleService.setTitle(newTitle);
  }
}
