import { createConnection, BaseEntity } from 'typeorm';
import { ArticleContent } from '../models';

type ModelId = 'articleContentId' | '';

const ids = {} as { [key in ModelId]: Set<string> };

export async function init() {
  await createConnection();
  const articleContents = await ArticleContent.find({ select: ['articleId'] });
  ids.articleContentId = new Set(articleContents.map((v) => v.articleId));
  console.log(articleContents.length);
}

export const save = <T extends BaseEntity>(src: T) => src.save();

export const has = (src: { [key in ModelId]?: string }) => {
  const key = Object.keys(src)[0] as ModelId;
  return ids[key].has(src[key]);
};
