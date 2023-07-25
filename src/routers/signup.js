'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

router.post('/', async (req, res)=> {
    const { username, password, email, phone, firstName, lastName } = req.body;
    console.log(req.body);
await db('users.users').insert({
        username,
        password,
        email,
        salt: "sd",
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
      });
      res.status(201).json({ message: 'User signed up successfully.' });
});

module.exports = router;