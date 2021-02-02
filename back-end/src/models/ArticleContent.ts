import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Article } from './Article';

@Entity()
export class ArticleContent extends BaseEntity {
  @Column()
  @PrimaryColumn()
  articleId: string;

  @Column({ type: 'mediumtext' })
  content: string;

  @OneToOne(
    () => Article,
    (a) => a._content
  )
  @JoinColumn()
  article: Article;
}
