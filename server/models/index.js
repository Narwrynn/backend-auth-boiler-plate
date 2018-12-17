const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE, { //Remeber to set up database and put it in .env
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.User = require('./user');