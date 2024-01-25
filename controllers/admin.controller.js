// controllers/admin.controller.js

const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const path = require('path');
const fs = require('fs');

module.exports = {
    getHome: (req, res) => {
        res.render('main-admin', { 
            title: 'OGANI | Admin',
            layout: 'admin',
        });
    },
    getCategory: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 3;

        const totalCategories = await categoryModel.getTotalNumberOfCategories();
        const totalPages = Math.ceil(totalCategories.count / perPage);
        const categories = await categoryModel.getCategoriesInPage(page, perPage);

        res.render('category-admin', { 
            layout: '_',
            categories: categories,
            totalPages: totalPages,
            currentPage: page
        });
    },
    getProduct: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;

        const totalProducts = await productModel.getTotalNumberOfProducts();
        const totalPages = Math.ceil(totalProducts.count / perPage);
        const products = await productModel.getProductsInPage(page, perPage);
        const categories = await categoryModel.getAllCategories();

        res.render('product-admin', {
            layout: '_',
            products: products,
            categories: categories,
            totalPages: totalPages,
            currentPage: page
        });
    },
    getUser: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;

        const totalUsers = await userModel.getTotalNumberOfUsers();
        const totalPages = Math.ceil(totalUsers.count / perPage);
        const users = await userModel.getUsersInPage(page, perPage);

        res.render('user-admin', { 
            layout: '_',
            users: users,
            totalPages: totalPages,
            currentPage: page
        });
    },
    getStatistics: (req, res) => {
        res.render('statistics-admin', { 
            title: 'OGANI | Statistics',
            layout: '_',
        });
    },
    postAddCategory: async (req, res) => {
        try {
            const name = req.body.name.trim();
            const desc = req.body.desc.trim();
            const img = 'img/uploads/' + req.file.filename; 

            await categoryModel.saveCategory(name, desc, img);

            res.redirect('/admin/category');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    postEditCategory: async (req, res) => {
        try {
            const id = req.body.id;
            const name = req.body.name.trim();
            const desc = req.body.desc.trim();

            const category = await categoryModel.getCategoryById(id);
            const oldImgPath = category.img;

            if (req.file) {
                const img = 'img/uploads/' + req.file.filename; 

                if (oldImgPath) {
                    fs.unlinkSync(path.join(__dirname, '../public', oldImgPath));
                }

                await categoryModel.updateCategory(id, name, desc, img);
            } else {
                await categoryModel.updateCategory(id, name, desc, null);
            }

            res.redirect('/admin/category');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    getDeleteCategory: async (req, res) => {
        try {
            const id = req.query.id;
            const category = await categoryModel.getCategoryById(id);
            const imgPath = category.img;

            if (imgPath) {
                fs.unlinkSync(path.join(__dirname, '../public', imgPath));
            }

            await categoryModel.deleteCategory(id);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    postAddProduct: async (req, res) => {
        try {
            const name = req.body.name.trim();
            const desc = req.body.desc.trim();
            const price = req.body.price;
            const img = 'img/uploads/' + req.file.filename; 
            const quantity = req.body.quantity;
            const categoryId = req.body.categoryId;

            await productModel.saveProduct(name, desc, price, img, quantity, categoryId);

            res.redirect('/admin/product');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    postEditProduct: async (req, res) => {
        try {
            const id = req.body.id;
            const name = req.body.name.trim();
            const desc = req.body.desc.trim();
            const price = req.body.price;
            const quantity = req.body.quantity;
            const categoryId = req.body.categoryId;

            const product = await productModel.getProductById(id);
            const oldImgPath = product.img;

            if (req.file) {
                const img = 'img/uploads/' + req.file.filename; 

                if (oldImgPath) {
                    fs.unlinkSync(path.join(__dirname, '../public', oldImgPath));
                }

                await productModel.updateProduct(id, name, desc, price, img, quantity, categoryId);
            } else {
                await productModel.updateProduct(id, name, desc, price, null, quantity, categoryId);
            }

            res.redirect('/admin/product');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    getDeleteProduct: async (req, res) => {
        try {
            const id = req.query.id;
            const product = await productModel.getProductById(id);
            const imgPath = product.img;

            if (imgPath) {
                fs.unlinkSync(path.join(__dirname, '../public', imgPath));
            }

            await productModel.deleteProduct(id)
            .then(() => {
                res.status(200).send({
                    message: 'Product deleted successfully.'
                });
            })
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    getLockUser: async (req, res) => {
        try {
            const id = req.query.id;
            await userModel.lockUser(id);

            res.redirect('/admin/user');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    },
    getUnlockUser: async (req, res) => {
        try {
            const id = req.query.id;
            await userModel.unlockUser(id);

            res.redirect('/admin/user');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    }
}