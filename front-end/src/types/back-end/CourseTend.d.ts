import { BaseEntity } from 'typeorm';
import { CourseTendType } from './Enum';
import { Course } from './Course';
import { User } from './User';
export declare class CourseTend extends BaseEntity {
    courseId: string;
    course: Course;
    userId: string;
    user: User;
    type: CourseTendType;
}
