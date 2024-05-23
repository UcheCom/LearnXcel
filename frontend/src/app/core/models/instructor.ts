import { Course } from "./course";

export interface Instructor {
  id: number;
  firstName: String;
  lastName: String;
  courses: Course[];
  // More
}