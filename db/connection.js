require('dotenv').config();
const { MONGODBURI } = process.env;
const mongoose = require('mongoose');

mongoose.connect(MONGODBURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

mongoose.Promise = Promise;

module.exports = mongoose;
