//Import connection
const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

/* Create Author as new schema
    properties:
    firstName (string),
    lastName (string),
    cookbooks[] (reference to Cookbook model by id)
*/
const AuthorSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	cookbooks: [{ ref: 'Cookbook', type: Schema.Types.ObjectId }],
});

const Author = mongoose.model('Author', AuthorSchema);

//export model named "Author"
module.exports = Author;
