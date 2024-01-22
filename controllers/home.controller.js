// controllers/home.controller.js

const categoryModel = require('../models/category.model');

module.exports = {
    getHome: async (req, res) => {
        const categories = await categoryModel.getAllCategories();

        res.render('index', { 
            title: 'OGANI | Home',
            name: req.user ? req.user.name : null,
            categories: categories,
        });
    }
}