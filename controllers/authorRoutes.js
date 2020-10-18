const express = require('express');
const router = express.Router();

const Author = require('../models/Author');
const Cookbook = require('../models/Cookbook');

// Write the route to list all authors
// GET ROUTE - INDEX
const index = async (req, res) => {
	try {
		const data = await Author.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
};
router.get('/', (req, res) => index(req, res));

// Write the route to get authors by firstname

// Write the route to create an author:

// Write the route to update an author

// Update the cookbook using Postman.

// Bonus: Write the route to delete cookbooks by author name. (hint: There are a couple on different ways to do this and you may have to change/add code in other files)

module.exports = router;
