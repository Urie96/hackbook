declare type Course = import('./back-end/').Course;

declare type Section = import('./back-end/').Section;

declare type Article = import('./back-end/').Article;

declare type ArticleComment = import('./back-end/').ArticleComment;

declare type CourseTend = import('./back-end/').CourseTend;

declare interface Window {
  isAuthenticated: boolean;
}
