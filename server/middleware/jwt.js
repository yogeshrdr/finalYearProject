const JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt;

const Admin  = require('../models/admin');
const User = require('../models/user');
const Ngo = require('../models/ngo');

const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         const type = jwt_payload.type;

         if(type === 'admin'){
            Admin.findById(jwt_payload.id)
            .then(user => {
                  return done(null, user, type);
            })
            .catch(err => {
               return done(err, false, null, { message: 'Server Error' });
            });
         }


         else if(type  === 'ngo'){
            Ngo.findById(jwt_payload.id)
            .then(user => {
               console.log(user);
                  return done(null, user, type);
            })
            .catch(err => {
               return done(err, false, null, { message: 'Server Error' });
            });
         }
         
         else if(type == 'user'){
            User.findById(jwt_payload.id)
            .then(user => {
                  return done(null, user, type);
            })
            .catch(err => {
               return done(err, false, null, { message: 'Server Error' });
            });
         }


         else{
            return done(null, false);
         }
         
      })
   );
};