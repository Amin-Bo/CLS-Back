var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/users");

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest  = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.SECRET||"clsRH";

  //console.log("inside passport")
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      //console.log(jwt_payload);
      try {
        const user = await User.findById(jwt_payload.user._id);
      
          return  done(null, user);
        
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
