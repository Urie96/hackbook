import { BaseEntity } from 'typeorm';
import { Article } from './Article';
export declare class ArticleContent extends BaseEntity {
    articleId: string;
    content: string;
    article: Article;
}
