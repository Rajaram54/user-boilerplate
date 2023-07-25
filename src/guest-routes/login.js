'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = process.env.JWTSECRET;

router.get('/', (req, res) => {
  res.render('login.ejs')
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    // If user is authenticated, generate and send JWT token
    req.session.user = user;
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    return res.cookie('token', token, { httpOnly: true, secure: false /* set to true in production */ }).redirect("http://localhost:3000/")
  })(req, res, next);
});

module.exports = router;