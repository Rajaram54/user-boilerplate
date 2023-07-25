'use strict';
const express = require('express');
const router = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const config = require('../../knexfile');
const db = knex(config.development);
router.get('/', (req, res) => {
  res.render('register.ejs')
});

router.post('/', async(req, res) => {
    const { username, password, email, phone, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);
    await db('users.users').insert({
        username,
        password: hashedPassword,
        email,
        salt: "sd",
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
      });
      res.redirect("http://localhost:8081/login");
});

module.exports = router;