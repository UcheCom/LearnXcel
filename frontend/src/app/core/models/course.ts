import { CourseCategory } from "./course-category";
import { Instructor } from "./instructor";
import { Lesson } from "./lesson";
import { Review } from "./review";
import { Tag } from "./tag";

export interface Course {
  courseId: number;
  courseName: String;
  description: string;
  imageUrl: string;
  videoIntroUrl: string;
  langage: string;
  startDate: Date;
  requirements: string;
  lessons: Lesson[];
  instructors: Instructor[];
  category: CourseCategory;
  tags: Tag[];

  level: number;
  status: string;
  rating: number;
  enrolled: number;
  totalStudent: number;
  duration: string;
  summerQuiz: string;
  material: string;
  reviews: Review;
}
