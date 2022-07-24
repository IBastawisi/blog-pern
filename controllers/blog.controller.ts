import { Router } from "express";
import { Blog, User } from "../models";
import blogFinder, { blogFinderParams } from "../middlewares/blogFinder";
import isAuthenticated from "../middlewares/isAuthenticated";
import 'express-async-errors';

const router = Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  });
  res.json(blogs);
});

router.post('/', isAuthenticated, async (req, res, next) => {
  const user = req.user as User;
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
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

router.delete<blogFinderParams>('/:id', isAuthenticated, blogFinder, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  const user = req.user as User;

  if (blog && blog.userId === user.id) {
    await blog.destroy();
  }
  res.status(204).end()
});

export default router;