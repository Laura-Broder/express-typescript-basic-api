export enum VisibilityEnum {
  PUBLIC = "public",
  PRIVATE = "private",
  LOGGED_IN = "logged_in",
}
export type VisibilityType = "public" | "private" | "logged_in";

export interface IArticle {
  article_id: string;
  title: string;
  content: string;
  creator_id: string;
  visibility: VisibilityType;
  isOwner: (user_id: string) => boolean;
  isPublic: () => boolean;
}

export default class Article implements IArticle {
  article_id: string;
  title: string;
  content: string;
  creator_id: string;
  visibility: VisibilityType;

  constructor(
    article_id: string,
    title: string,
    content: string,
    visibility: VisibilityType,
    creator_id: string
  ) {
    this.article_id = article_id;
    this.title = title;
    this.content = content;
    this.visibility = visibility;
    this.creator_id = creator_id;
  }

  isOwner = (user_id: string): boolean => this.creator_id === user_id;
  isPublic = (): boolean => this.visibility === VisibilityEnum.PUBLIC;
}
