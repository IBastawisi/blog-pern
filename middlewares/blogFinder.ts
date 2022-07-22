import { RequestHandler } from "express";
import { Blog } from "../models";

export type blogFinderParams = {[key: string]: string;}&{blog: Blog | null};

const blogFinder: RequestHandler<blogFinderParams> = async (req, res, next) => {
  req.params.blog = await Blog.findByPk(req.params.id)
  next()
};

export default blogFinder;