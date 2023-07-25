'use strict';
const express = require('express');
const router = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const config = require('../../knexfile');
const db = knex(config.development);

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  // Retrieve the user's salt and hashed password from the database (replace with your own code)
  const user = await db('users.users').select('password', 'salt').where({
    username
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


router.post('/', async (req, res)=> {
    const { username, password } = req.body;

    try {
      // Retrieve the user's hashed password from the database (replace with your own code)
      const result = await db('users.users').select('password');
      console.log(result);
      const hashedPassword = result[0].password;
  
      // Compare the provided password with the hashed password
      const match = await bcrypt.compare(password, hashedPassword);
  
      if (match) {
        // Passwords match, login successful
        res.json({ message: 'Login successful' });
      } else {
        // Passwords do not match, login failed
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', (req, res)=> {
    console.log("came in-------------->")
    res.send('hihihihih')
});

module.exports = router;