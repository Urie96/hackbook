declare interface Course {
  id: number;
  title: string;
  brief: string;
  teacherName: string;
  teacherTitle: string;
  price: number;
  image: string;
  articleCount: number;
  purchasedCount: string;
  done: boolean;
}

declare interface Section {
  id: number;
  courseId: number;
  name: string;
  articles: Article[];
}

declare interface Article {
  id: number;
  sectionId: number;
  courseId: number;
  title: string;
  done: boolean;
  publishDate: string;
  course: Course;
}

declare interface CourseIntroduce {
  courseId: number;
  content: string;
}

declare interface ArticleContent {
  articleId: number;
  content: string;
}

declare interface Comment {
  id: number;
  articleId: number;
  content: string;
  comments: Comment[];
  likeCount: string;
  nickName: string;
}

declare interface Favorite {
  id: number;
  courseId: number;
  userId: number;
}

declare interface Dislike {
  id: number;
  courseId: number;
  userId: number;
}
