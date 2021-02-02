import { Resolver, Query, Arg, Authorized, Ctx, Mutation } from 'type-graphql';
import { CourseTend, UserRole } from '../models/';

@Resolver(CourseTend)
export class CourseTendResolver {
  @Query(() => [CourseTend])
  @Authorized(UserRole.ADMIN)
  courseTends(@Ctx() ctx: Koa.Context) {
    return CourseTend.find({ userId: ctx.user.id });
  }

  @Mutation(() => CourseTend)
  @Authorized([UserRole.ADMIN])
  addCourseTend(
    @Arg('courseId') courseId: string,
    @Arg('type') type: Enum.CourseTendType,
    @Ctx() ctx: Koa.Context
  ) {
    const tend = new CourseTend();
    tend.courseId = courseId;
    tend.type = type;
    tend.userId = ctx.user.id;
    return tend.save();
  }

  @Mutation(() => Boolean)
  @Authorized([UserRole.ADMIN])
  async deleteCourseTend(
    @Arg('courseId') courseId: string,
    @Ctx() ctx: Koa.Context
  ) {
    const res = await CourseTend.delete({
      courseId,
      userId: ctx.user.id,
    } as CourseTend);
    return res.affected >= 1;
  }
}
