import { BaseEntity } from 'typeorm';
import { Course } from './Course';
export declare class CourseDescription extends BaseEntity {
    courseId: string;
    content: string;
    course: Course;
}
