import { Article } from './Article';
import { Base } from './Base';
export declare class ArticleComment extends Base {
    content: string;
    likeCount: number;
    nickName: string;
    article?: Article;
    replies?: ArticleComment[];
    parentComment?: ArticleComment;
}
