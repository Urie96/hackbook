import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Article } from './Article';
import { Base } from './Base';

@Entity()
@ObjectType()
export class ArticleComment extends Base {
  @Column({ type: 'text' })
  @Field()
  content: string;

  @Column()
  @Field()
  likeCount: number;

  @Field()
  @Column()
  nickName: string;

  @ManyToOne(
    () => Article,
    (a) => a.comments,
    { nullable: true }
  )
  @JoinColumn()
  article?: Article;

  @OneToMany(
    () => ArticleComment,
    (c) => c.parentComment,
    { nullable: true }
  )
  @Field(() => [ArticleComment])
  replies?: ArticleComment[];

  @ManyToOne(
    () => ArticleComment,
    (c) => c.replies,
    { nullable: true }
  )
  parentComment?: ArticleComment;
}
