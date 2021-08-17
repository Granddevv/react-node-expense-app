const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.DBSTRING;

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
require('../app/models');
mongoose.Promise = global.Promise;

module.exports = mongoose;