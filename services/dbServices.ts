import Article, {
  IArticle,
  VisibilityEnum,
  VisibilityType,
} from "./articleServices";
import User, { IUser } from "./userServices";

interface IDB {
  users: IUser[];
  articles: IArticle[];
}

export default class DB implements IDB {
  users: IUser[];
  articles: IArticle[];
  constructor({ users, articles }: IDB) {
    this.users = users;
    this.articles = articles;
  }
  createNewUser = (user_id: string, login: string, password: string): void => {
    const newUser = new User(user_id, login, password);
    this.users.push(newUser);
  };
  getUserByLogin = (login: string) => {
    return this.users.find((u) => u.login === login);
  };
  getUserByID = (user_id: string) => {
    return this.users.find((u) => u.user_id === user_id);
  };
  getUserByToken = (token: string): IUser | undefined => {
    return this.users.find((u) => u.validateToken(token));
  };
  createNewArticle = (
    article_id: string,
    title: string,
    content: string,
    visibility: VisibilityType,
    user: IUser
  ) => {
    const creator_id = user.user_id;
    const newArticle = new Article(
      article_id,
      title,
      content,
      visibility,
      creator_id
    );
    this.articles.push(newArticle);
  };

  getVisibleArticlesForUserId = (user_id: string): IArticle[] => {
    return this.articles.filter((a) => {
      if (a.isOwner(user_id) || a.isPublic()) return true;
      if (a.visibility === VisibilityEnum.LOGGED_IN) {
        return this.getUserByID(a.creator_id)?.isLoggedIn();
      }
      return false;
    });
  };
}

// In memory db
export const db = new DB({
  users: [],
  articles: [],
});
