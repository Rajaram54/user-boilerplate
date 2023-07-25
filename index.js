const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const localStrategy = require('./localStrategy'); 
const authenticateToken = require('./authenticateToken');
let app = express();
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cors({
  origin: 'http://localhost:3000',
}))
// Parse JSON bodies & Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(localStrategy);

// guest-routes
app.use('/', require('./src/guest-routes'))

// Protected routes =======================================================================
app.use('/api/v1', authenticateToken, require('./src/routers'));

app.listen(process.env.PORT, (err) => {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", process.env.PORT);
});
