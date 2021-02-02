import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Course } from './Course';

@ObjectType()
@Entity()
export class CourseDescription extends BaseEntity {
  @Column()
  @Field()
  @PrimaryColumn()
  courseId: string;

  @Field()
  @Column({ type: 'text' })
  content: string;

  @OneToOne(
    () => Course,
    (c) => c._description
  )
  @JoinColumn()
  course: Course;
}
