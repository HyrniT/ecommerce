// controllers/home.controller.js

const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');

module.exports = {
    getHome: async (req, res) => {
        const categories = await categoryModel.getAllCategories();
        const products = await productModel.getAllProducts();

        res.render('index', { 
            home: true,
            title: 'OGANI | Home',
            name: req.user ? req.user.name : null,
            categories: categories,
            products: products
        });
    },
    getShop: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 9;

        const totalProducts = await productModel.getTotalNumberOfProducts();
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductInPage(page, perPage);
        const categories = await categoryModel.getAllCategories();

        res.render('shop', { 
            shop: true,
            title: 'OGANI | Shop',
            name: req.user ? req.user.name : null,
            categories: categories,
            products: products,
            totalProducts: totalProducts.count,
            totalPages: totalPages,
            currentPage: page
        });
    },
    getSearch: async (req, res) => {
        const keyword = req.query.keyword.toLowerCase();
        const page = parseInt(req.query.page) || 1;
        const perPage = 9;

        const totalProducts = await productModel.getTotalNumberOfProductsByName(keyword);
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductInPageByName(page, perPage, keyword);
        const categories = await categoryModel.getAllCategories();

        res.render('search', { 
            shop: true,
            keyword: keyword,
            title: 'OGANI | Shop',
            name: req.user ? req.user.name : null,
            products: products,
            categories: categories,
            totalProducts: totalProducts.count,
            totalPages: totalPages,
            currentPage: page
        });
    }
}