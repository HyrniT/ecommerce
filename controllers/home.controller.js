// controllers/home.controller.js

const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');

module.exports = {
    getHome: async (req, res) => {
        const categories = await categoryModel.getAllCategories();
        const products = await productModel.getAllProducts();

        res.render('index', { 
            title: 'OGANI | Home',
            name: req.user ? req.user.name : null,
            categories: categories,
            products: products
        });
    }
}