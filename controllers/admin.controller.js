// controllers/admin.controller.js

const categoryModel = require('../models/category.model');
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
        const categories = await categoryModel.getAllCategories();
        res.render('category-admin', { 
            title: 'OGANI | Categories Management',
            layout: '_',
            categories: categories,
        });
    },
    getProduct: (req, res) => {
        res.render('product-admin', { 
            title: 'OGANI | Products Management',
            layout: '_',
        });
    },
    getUser: (req, res) => {
        res.render('user-admin', { 
            title: 'OGANI | Users Management',
            layout: '_',
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
            const img = path.join('/img/uploads', req.file.filename);

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
                const img = path.join('/img/uploads', req.file.filename);

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
    }
}