// controllers/category.controller.js

const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');

module.exports = {
    getProductByCategory: async (req, res) => {
        const id = parseInt(req.query.id);
        const page = parseInt(req.query.page) || 1;
        const perPage = 3;

        const totalProducts = await productModel.getTotalNumberOfProductsByCategory(id);
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductInPageByCategory(page, perPage, id);
        const categories = await categoryModel.getAllCategories();
        const category = await categoryModel.getCategoryById(id);

        if (req.user) {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.render('category', {
                id: id,
                shop: true,
                title: 'OGANI | ' + category.name,
                name: req.user.name,
                nameCategory: category.name,
                products: products,
                categories: categories,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('category', {
                id: id,
                shop: true,
                title: 'OGANI | ' + category.name,
                name: null,
                nameCategory: category.name,
                products: products,
                categories: categories,
                totalProducts: totalProducts.count,
                totalPages: totalPages,
                currentPage: page
            });
        }
    }
}