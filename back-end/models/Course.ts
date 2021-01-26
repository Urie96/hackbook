import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Base } from './Base';
import { Section } from './Section';
import { CourseDescription } from './CourseDescription';
import { CourseTendType } from './Enum';

@ObjectType()
@Entity()
export class Course extends Base {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  brief: string;

  @Field()
  @Column()
  teacherName: string;

  @Field()
  @Column()
  teacherTitle: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ default: 0 })
  articleCount: number;

  @Field()
  @Column()
  purchasedCount: string;

  @Field()
  @Column({ default: false })
  done: boolean;

  @Field(() => [Section])
  @OneToMany(
    () => Section,
    (section) => section.course
  )
  sections?: Section[];

  @OneToOne(
    () => CourseDescription,
    (c) => c.course
  )
  _description: CourseDescription;

  @Field({ nullable: true })
  description: string;

  @Field(() => CourseTendType, { nullable: true })
  userTend?: CourseTendType;

  sort() {
    const getId = (id: string) => Number(id.match(/\d+/)?.[0]);
    const comparator = (a, b) => getId(a.id) - getId(b.id);
    this.sections.sort(comparator).forEach((s) => s.articles.sort(comparator));
  }
}
