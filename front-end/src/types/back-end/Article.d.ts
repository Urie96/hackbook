import { Base } from './Base';
import { Section } from './Section';
import { ArticleContent } from './ArticleContent';
import { ArticleComment } from './ArticleComment';
export declare class Article extends Base {
    title: string;
    done: boolean;
    publishDate: string;
    section: Section;
    sectionId: string;
    _content: ArticleContent;
    content: string;
    comments: ArticleComment[];
}
