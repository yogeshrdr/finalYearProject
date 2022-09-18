const passport = require('passport');

module.exports = (req, res, next) => {
   passport.authenticate('jwt', function (err, user, type, info) {
    if (err)
        return next(err);

    if (!user)
        return res.status(401).json({ success: false, message: "Unauthorized Access" });

    if(type == 'admin')
        req.admin = user;
    if(type == 'user')
        req.user = user;
    if(type == 'ngo')
        req.ngo = user;

      next();
   })(req, res, next);
};