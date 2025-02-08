import * as React from "react";

export type ReactFCC = React.FC<React.PropsWithChildren>;

export type ReactFCCWithProps<T> = React.FC<React.PropsWithChildren<T>>;

export interface IArticle {
  id: string;
  title: string;
  content: string;
  author?: string;
  publicationDate?: string;
}
