import { Router } from 'express';
import isAdmin from '../middlewares/isAdmin';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router()

import { Blog, User } from '../models'

router.get('/me', async (req, res) => {
  const user = req.user;
  res.json(user || null);
})

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['id']
    }
  })
  res.json(users)
})

router.post('/', isAdmin, async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', isAdmin, async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    await user.update(req.body)
    res.json(user)
  } else {
    res.status(404).end()
  }
});

export default router;