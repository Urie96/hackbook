import {
  Resolver,
  Query,
  Arg,
  FieldResolver,
  Root,
  Ctx,
  Authorized,
} from 'type-graphql';
import {
  Course,
  CourseTendType,
  CourseTend,
  UserRole,
  CourseDescription,
} from '../models';

@Resolver(Course)
export class CourseResolver {
  @Query(() => Course)
  async course(@Arg('id') id: string) {
    const course = await Course.findOne(id, {
      relations: ['sections', 'sections.articles'],
    });
    course.sort();
    return course;
  }

  @Query(() => [Course])
  async courses(@Ctx() { user }: Koa.Context) {
    const courses = await Course.find();
    if (!user) return courses;
    const courseTends = await CourseTend.find({ userId: user.id });
    courses.forEach((c) => {
      const courseTend = courseTends.find((ct) => ct.courseId === c.id);
      if (courseTend) {
        c.userTend = courseTend.type;
      }
    });
    return courses;
  }

  @FieldResolver(() => CourseTendType, { nullable: true })
  @Authorized(UserRole.ADMIN)
  async userTend(@Root() course: Course, @Ctx() { user }: Koa.Context) {
    if (course.userTend) return course.userTend;
    const courseTend = await CourseTend.findOne({
      courseId: course.id,
      userId: user.id,
    });
    if (courseTend) {
      return courseTend.type;
    }
  }

  @FieldResolver(() => String, { nullable: true })
  async description(@Root() course: Course) {
    const { content } = await CourseDescription.findOne(course.id);
    return content;
  }
}
