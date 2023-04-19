import { NextFunction, Request, Response } from "express";
import { db } from "./dbServices";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  const user = db.getUserByToken(token);
  if (!user) return res.sendStatus(404);
  req.body.user = user;
  req.body.token = token;
  console.log("User successfully authenticated");

  next();
}
