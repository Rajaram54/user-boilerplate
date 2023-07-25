const LocalStrategy = require('passport-local').Strategy;
const knex = require('knex');
const bcrypt = require('bcryptjs');
const config = require('./knexfile');
const db = knex(config.development);

// Passport Local Strategy
const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await db('users.users').select('password', 'salt').where({
        username,
      });

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

        // Verify the hashed password
        const match = await bcrypt.compare(password, user[0].password);

        if (match) {
            return done(null, user);
        } 
        return done(null, false, { message: 'Invalid username or password' })
    
  } catch (error) {
    return done(error);
  }
});

module.exports = localStrategy;
