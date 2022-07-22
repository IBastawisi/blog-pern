import { Router } from "express";
import { Blog } from "../models";
import blogFinder, { blogFinderParams } from "../middlewares/blogFinder";
import 'express-async-errors';

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
});

router.get<blogFinderParams>('/:id', blogFinder, async (req, res) => {
  const blog = req.params.blog;
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
});

router.put<blogFinderParams>('/:id', blogFinder, async (req, res) => {
  const blog = req.params.blog;
  if (blog) {
    await blog.update(req.body)
    res.json(blog)
  } else {
    res.status(404).end()
  }
});

router.delete<blogFinderParams>('/:id', blogFinder, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    await blog.destroy();
  }
  res.status(204).end()
});

export default router;