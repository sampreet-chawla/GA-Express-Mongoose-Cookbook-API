const express = require('express');
const { findById } = require('../models/Author');
const router = express.Router();

const Author = require('../models/Author');
const Cookbook = require('../models/Cookbook');

// Write the route to list all authors
// GET ROUTE - ACTION INDEX
router.get('/', async (req, res) => {
	try {
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to get authors by firstname
// GET ROUTE - ACTION SHOW
router.get('/firstName/:firstName', async (req, res) => {
	try {
		const data = await Author.find({
			firstName: { $regex: req.params.firstName, $options: 'i' },
		}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to create an author:
// POST ROUTE - ACTION CREATE
router.post('/', async (req, res) => {
	try {
		await Author.create(req.body);
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to update an author
// PUT ROUTE - ACTION UPDATE
router.put('/id/:id', async (req, res) => {
	try {
		await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Adding Cookbook id to Author
// localhost:4000/api/authors/id/5f8bb507fd78c51394523b42/addCookbook/5f8bb6420be09615d3340b2a
//localhost:4000/api/authors/id/5f8bb507fd78c51394523b42/addCookbook/5f8bb6490be09615d3340b2b
router.put('/id/:id/addCookbook/:cookbookId', async (req, res) => {
	try {
		const cookbook = await Cookbook.findById(req.params.cookbookId);
		await Author.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { cookbooks: cookbook.id } },
			{ new: true }
		);
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// removing Cookbook id from Author
// Sample URL - localhost:4000/api/authors/id/5f8bb507fd78c51394523b42/removeCookbook/5f8bb6420be09615d3340b2a
//localhost:4000/api/authors/id/5f8bb507fd78c51394523b42/removeCookbook/5f8bb6490be09615d3340b2b
router.put('/id/:id/removeCookbook/:cookbookId', async (req, res) => {
	try {
		const cookbook = await Cookbook.findById(req.params.cookbookId);
		await Author.findByIdAndUpdate(
			req.params.id,
			{ $pull: { cookbooks: cookbook.id } },
			{ new: true }
		);
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Delete Author
router.delete('/id/:id', async (req, res) => {
	try {
		const cookbook = await Cookbook.findById(req.params.cookbookId);
		await Author.deleteOne({ _id: req.params.id });
		const data = await Author.find({}).populate('cookbooks');
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Update the cookbook using Postman.

// Bonus: Write the route to delete cookbooks by author name. (hint: There are a couple on different ways to do this and you may have to change/add code in other files)

module.exports = router;
