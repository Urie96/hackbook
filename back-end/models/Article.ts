import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Section } from './Section';
import { ArticleContent } from './ArticleContent';
import { ArticleComment } from './ArticleComment';

@ObjectType()
@Entity()
export class Article extends Base {
  @Field()
  @Column()
  title: string;

  @Column({ default: false })
  @Field()
  done: boolean;

  @Column({ default: '' })
  @Field()
  publishDate: string;

  @ManyToOne(
    () => Section,
    (section) => section.articles
  )
  @Field(() => Section)
  section: Section;

  @Column()
  sectionId: string;

  @OneToOne(
    () => ArticleContent,
    (a) => a.article
  )
  _content: ArticleContent;

  @Field()
  content: string;

  @Field(() => [ArticleComment])
  @OneToMany(
    () => ArticleComment,
    (c) => c.article
  )
  comments: ArticleComment[];
}
