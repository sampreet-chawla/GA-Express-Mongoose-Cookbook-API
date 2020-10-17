//import connection
const mongoose = require('../db/connection');

/* Create Cookbook as new schema
    Properties:
    title (string),
    yearPublished (integer),
*/
const CookbookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	yearPublished: { type: Number, required: true },
});

const Cookbook = mongoose.model('Cookbook', CookbookSchema);

//export model
module.exports = Cookbook;
