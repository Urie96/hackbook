import {
  Resolver,
  Query,
  Arg,
  FieldResolver,
  Root,
  Authorized,
} from 'type-graphql';
import {
  Article,
  ArticleContent,
  ArticleComment,
  UserRole,
  User,
} from '../models';

@Resolver(Article)
export class ArticleResolver {
  @Query(() => Article)
  @Authorized(UserRole.ADMIN, UserRole.VISITOR)
  article(@Arg('id') id: string) {
    return Article.findOne(id, { relations: ['section', 'section.course'] });
  }

  @FieldResolver(() => String)
  @Authorized(UserRole.ADMIN, UserRole.VISITOR)
  async content(@Root() article: Article) {
    const { content } = await ArticleContent.findOne(article.id);
    return content;
  }

  @FieldResolver(() => [ArticleComment])
  @Authorized(UserRole.ADMIN, UserRole.VISITOR)
  async comments(@Root() article: Article) {
    const { comments } = await Article.findOne(article.id, {
      relations: ['comments', 'comments.replies'],
    });
    return comments;
  }
}
