import { IArticle, IDomainPost } from "./model";

export const getRandomDate = (yearsAgo: number | undefined = 5): string => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - yearsAgo);

  const randomTimestamp =
    past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTimestamp).toISOString().split("T")[0];
};

export const mapArticleToDomainPost = (article: IArticle): IDomainPost => ({
  id: article.id,
  title: article.title,
  body: article.content,
  userId: article.authorId,
  publicationDate: article.publicationDate,
});

export const mapDomainPostToArticle = (post: IDomainPost): IArticle => ({
  id: post.id,
  title: post.title,
  content: post.body,
  authorId: post.userId!,
  publicationDate: post.publicationDate,
});
