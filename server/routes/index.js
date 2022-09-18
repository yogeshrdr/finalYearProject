const admin = require('./admin');
const donation = require('./donation');
const ngo = require('./ngo');
const ngoDrives = require('./ngoDrives');
const publicFridges = require('./publicFriges');
const user = require('./user');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Api Started"});
    });

    app.use('/', admin);
    app.use('/', donation);
    app.use('/', ngo);
    app.use('/', ngoDrives);
    app.use('/', publicFridges);
    app.use('/', user);

};