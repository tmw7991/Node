const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./user');

require('dotenv').config();
mongoose.connect(process.env.DB_STRING);

const app = express();
const port = process.env.PORT || 5000;
process.env.NODE_ENV = 'production';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'supersecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("Email not recognized");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

app.post('/register', (req, res) => {
    User.findOne({email: req.body.email}, async (err, doc) => {
        console.log(err, doc)
        if (err) throw err;
        if (doc) res.send('Email already in use');
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword
            });
            await newUser.save();
            res.send('User created');
        }
    })
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.listen(port, () => console.log(`Listening on port ${port}`))