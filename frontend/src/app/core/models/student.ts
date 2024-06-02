import { Course } from "./course";
import { User } from "./user";

export interface Student extends User {
  courses: Course[]
}