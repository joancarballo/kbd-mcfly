const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("Login in");
    try {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        done(null, foundUser);
      } else {
        done(null, false);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);
