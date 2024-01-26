// controllers/home.controller.js

const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');
const e = require('cors');

module.exports = {
    getHome: async (req, res) => {
        const categories = await categoryModel.getAllCategories();
        const products = await productModel.getAllProducts();
        if (req.user) {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.render('index', { 
                home: true,
                title: 'OGANI | Home',
                name: req.user.name,
                categories: categories,
                products: products,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('index', { 
                home: true,
                title: 'OGANI | Home',
                name: null,
                categories: categories,
                products: products
            });
        }
    },
    getShop: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 9;

        const totalProducts = await productModel.getTotalNumberOfProducts();
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductInPage(page, perPage);
        const categories = await categoryModel.getAllCategories();

        if (req.user) {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.render('shop', { 
                shop: true,
                title: 'OGANI | Shop',
                name: req.user.name,
                categories: categories,
                products: products,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('shop', { 
                shop: true,
                title: 'OGANI | Shop',
                name: null,
                categories: categories,
                products: products,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page
            });
        }
    },
    getSearch: async (req, res) => {
        const keyword = req.query.keyword.toLowerCase();
        const page = parseInt(req.query.page) || 1;
        const perPage = 9;

        const totalProducts = await productModel.getTotalNumberOfProductsByName(keyword);
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductInPageByName(page, perPage, keyword);
        const categories = await categoryModel.getAllCategories();

        if (req.user) {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.render('search', { 
                shop: true,
                keyword: keyword,
                title: 'OGANI | Shop',
                name: req.user.name,
                products: products,
                categories: categories,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('search', { 
                shop: true,
                keyword: keyword,
                title: 'OGANI | Shop',
                name: null,
                products: products,
                categories: categories,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page
            });
        }
    },
    getContact: async (req, res) => {
        const categories = await categoryModel.getAllCategories();

        if (req.user) {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.render('contact', { 
                contact: true,
                title: 'OGANI | Contact',
                name: req.user.name,
                categories: categories,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('contact', { 
                contact: true,
                title: 'OGANI | Contact',
                categories: categories,
                name: null
            });
        }
    }
}