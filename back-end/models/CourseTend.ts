import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne } from 'typeorm';
import { CourseTendType } from './Enum';
import { Course } from './Course';
import { User } from './User';

@ObjectType()
@Entity()
export class CourseTend extends BaseEntity {
  @Field()
  @PrimaryColumn()
  courseId: string;

  @ManyToOne(
    () => Course,
    (course) => course.id
  )
  course: Course;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(
    () => User,
    (user) => user.id
  )
  user: User;

  @Column({
    type: 'enum',
    enum: CourseTendType,
  })
  @Field(() => CourseTendType)
  type: CourseTendType;
}
