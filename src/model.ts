import * as React from "react";

export type ReactFCC = React.FC<React.PropsWithChildren>;

export type ReactFCCWithProps<T> = React.FC<React.PropsWithChildren<T>>;

export interface IDomainPost {
  id: number;
  title: string;
  body: string;
  userId: number | null;
  publicationDate: string;
}

export interface IArticle {
  id: number;
  title: string;
  content: string;
  authorId: number;
  publicationDate: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface IAuthorsState {
  authors: IAuthor[];
  selectedAuthor?: IAuthor;
  loading: boolean;
  error?: string;
}

export interface IArticlesState {
  articles: IArticle[];
  selectedArticle?: IArticle;
  pendingRollbackArticle?: IArticle;
  loading: boolean;
  error?: string;
}
