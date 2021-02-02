import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './Base';
import { Article } from './Article';
import { Course } from './Course';

@ObjectType()
@Entity()
export class Section extends Base {
  @Field()
  @Column()
  title: string;

  @Field(() => [Article])
  @OneToMany(
    () => Article,
    (article) => article.section
  )
  articles: Article[];

  @ManyToOne(
    () => Course,
    (course) => course.sections
  )
  @Field(() => Course)
  course: Course;

  @Column()
  courseId: string;
}
