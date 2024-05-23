import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss'
})
export class LessonListComponent {
  lessons = [
    {
      id: 1,
      title: 'Leçon #01',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min'],
      material: 'Leçon #01',
      summerQuiz: 'Summer Quiz',
    },
    {
      id: 2,
      title: 'Leçon #02',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      material: 'Leçon #01',
      summerQuiz: 'Summer Quiz',
    },
    {
      id: 3,
      title: 'Leçon #03',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      material: 'Leçon #01',
      summerQuiz: 'Summer Quiz',
    },
    {
      id: 4,
      title: 'Leçon #04',
      contents: ['Course Intro - 3.27 min', 'Course Outline - 5.00 min', 'Course Outline - 7.00 min', 'Course Materials', 'Summer Quiz', 'Assignment'],
      material: 'Leçon #01',
      summerQuiz: 'Summer Quiz',
    },
  ];

  // togglePanel(id: number) {
  //   this.lessons.forEach(lesson => {
  //     if (lesson.id === id) {
  //       lesson.isOpen = !lesson.isOpen;
  //     } else {
  //       lesson.isOpen = false;
  //     }
  //   });
  // }
}
