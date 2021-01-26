import { Base } from './Base';
import { Section } from './Section';
import { CourseDescription } from './CourseDescription';
import { CourseTendType } from './Enum';
export declare class Course extends Base {
  title: string;
  brief: string;
  teacherName: string;
  teacherTitle: string;
  price: number;
  image: string;
  articleCount: number;
  purchasedCount: string;
  done: boolean;
  sections?: Section[];
  _description: CourseDescription;
  description: string;
  userTend?: CourseTendType;
}
