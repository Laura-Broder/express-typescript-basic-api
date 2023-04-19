"use strict";

import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { db } from "./services/dbServices";
import { IUser } from "./services/userServices";
import { VisibilityEnum } from "./services/articleServices";
import { auth } from "./services/authServices";

const app = express();
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ db });
});

app.post("/api/user", (req: Request, res: Response) => {
  const { user_id, login, password } = req.body;
  if (!(user_id && login && password)) return res.sendStatus(400);

  db.createNewUser(user_id, login, password);

  console.log("new user was created: ", login);
  res.sendStatus(201);
});

app.post("/api/authenticate", (req: Request, res: Response) => {
  const { login, password } = req.body;
  if (!(login && password)) return res.sendStatus(400);

  const user = db.getUserByLogin(login);
  if (!user) return res.sendStatus(404);

  if (!user.validatePassword(password)) return res.status(401).json();
  const token = user.getNewToken();

  console.log("user logged in: ", user.login);
  res.status(200).json({ token });
});

app.post("/api/logout", auth, (req: Request, res: Response) => {
  const { user, token }: { user: IUser; token: string } = req.body;
  user.logout(token);

  console.log("user logged out: ", user.login);
  res.sendStatus(200);
});

app.post("/api/articles", auth, (req: Request, res: Response) => {
  const { article_id, title, content, visibility, user } = req.body;
  if (!(article_id && title && content && visibility)) res.sendStatus(400);
  if (!Object.values(VisibilityEnum).includes(visibility)) res.sendStatus(400);
  db.createNewArticle(article_id, title, content, visibility, user);

  console.log("new article ", title, " was created");
  res.sendStatus(201);
});

app.get("/api/articles", auth, (req: Request, res: Response) => {
  const { user } = req.body;
  const articles = db.getVisibleArticlesForUserId(user.user_id);

  console.log("got ", articles.length, " visible articles");
  res.status(200).json({ articles });
});

exports.default = app.listen(process.env.HTTP_PORT || 3000, async () =>
  console.log(`Server up and running on port ${process.env.HTTP_PORT || 3000}`)
);
