import { Base } from './Base';
import { Article } from './Article';
import { Course } from './Course';
export declare class Section extends Base {
    title: string;
    articles: Article[];
    course: Course;
    courseId: string;
}
