import { Request, RequestHandler } from "express";
import { User } from "../models";

export type AuthorizedRequest = Request & { user: User };

const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    assertUser(req);
    next();
  } catch (error) { 
    res.status(401).send("You are not authenticated");
  }
};

function assertUser(req: Request): asserts req is AuthorizedRequest {
  if (!req.user) throw new Error("You are not authenticated");
}

export default isAuthenticated;