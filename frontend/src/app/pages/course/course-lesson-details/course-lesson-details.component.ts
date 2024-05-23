import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Custom components imports
import { VideoContentComponent } from './video-content/video-content.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';

@Component({
  selector: 'app-course-lesson-details',
  standalone: true,
  imports: [CommonModule, VideoContentComponent, LessonListComponent],
  templateUrl: './course-lesson-details.component.html',
  styleUrl: './course-lesson-details.component.scss'
})
export class CourseLessonDetailsComponent {
  // Fakes data
  lessons = [
    {
      id: 1,
      title: 'Leçon #01',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min'],
      isOpen: false
    },
    {
      id: 2,
      title: 'Leçon #02',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      isOpen: false
    },
    {
      id: 3,
      title: 'Leçon #03',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      isOpen: false
    },
    {
      id: 4,
      title: 'Leçon #04',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      isOpen: false
    },
  ];

  togglePanel(id: number) {
    this.lessons.forEach(lesson => {
      if (lesson.id === id) {
        lesson.isOpen = !lesson.isOpen;
      } else {
        lesson.isOpen = false;
      }
    });
  }
}