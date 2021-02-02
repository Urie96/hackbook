import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Article, ArticleContent, ArticleComment } from '../models';

@Resolver(Article)
export class ArticleResolver {
  @Query(() => Article)
  article(@Arg('id') id: string) {
    return Article.findOne(id, { relations: ['section', 'section.course'] });
  }

  @FieldResolver(() => String)
  async content(@Root() article: Article) {
    const { content } = await ArticleContent.findOne(article.id);
    return content;
  }

  @FieldResolver(() => [ArticleComment])
  async comments(@Root() article: Article) {
    const { comments } = await Article.findOne(article.id, {
      relations: ['comments', 'comments.replies'],
    });
    return comments;
  }
}
