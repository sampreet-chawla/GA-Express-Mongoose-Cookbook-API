const express = require('express');
const router = express.Router();

// Require the Cookbook controller.
const Cookbook = require('../models/Cookbook');

// Write the route to list all cookbooks
// GET ROUTE - ACTION INDEX
router.get('/', async (req, res) => {
	try {
		const data = await Cookbook.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to get cookbook by title
// GET ROUTE - ACTION SHOW
router.get('/title/:title', async (req, res) => {
	try {
		const data = await Cookbook.find({ title: req.params.title });
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to get cookbook by year published
// GET ROUTE - ACTION SHOW
router.get('/yearPublished/:yearPublished', async (req, res) => {
	try {
		const data = await Cookbook.find({
			yearPublished: req.params.yearPublished,
		});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to create a cookbook
// POST ROUTE - ACTION CREATE
router.post('/', async (req, res) => {
	try {
		await Cookbook.create(req.body);
		const data = await Cookbook.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to update a cookbook
// PUT ROUTE - ACTION UPDATE
router.put('/id/:id', async (req, res) => {
	try {
		await Cookbook.findByIdAndUpdate(req.params.id, req.body, { new: true });
		const data = await Cookbook.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

// Write the route to delete the cookbook by title
// DELETE ROUTE - ACTION DESTROY
router.delete('/title/:title', async (req, res) => {
	try {
		await Cookbook.deleteMany({
			title: { $regex: req.params.title, $options: 'i' },
		});
		const data = await Cookbook.find({});
		res.json({ status: 200, data: data });
	} catch (err) {
		res.json({ status: 200, error: err.message });
	}
});

module.exports = router;
