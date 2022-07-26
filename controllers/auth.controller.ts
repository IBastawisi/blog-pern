import passport from "passport";
import { Router } from "express";
import 'express-async-errors';

const router = Router();

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/logout', (req, res) => {
  req.logout({ keepSessionInfo: false }, () => {
    res.send('Logout Successful');
  });
});

router.get('/redirect',
  passport.authenticate('google', {
    failureMessage: 'cant login with google, try again later',
    successRedirect: 'http://localhost:3000/auth/success',
    failureRedirect: 'http://localhost:3000/auth/error',
  }),
  async (req, res) => {
    res.send('Login Successful');
  });

export default router;