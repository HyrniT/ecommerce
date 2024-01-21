// controllers/admin.controller.js

const categoryModel = require('../models/category.model');
const path = require('path');

module.exports = {
    getHome: (req, res) => {
        res.render('admin', { 
            title: 'OGANI | Admin',
            layout: 'admin',
        });
    },
    getCategory: async (req, res) => {
        const categories = await categoryModel.getAllCategories();
        res.render('admin', { 
            title: 'OGANI | Categories Management',
            layout: 'auth',
            category: true,
            categories: categories,
        });
    },
    getProduct: (req, res) => {
        res.render('admin', { 
            title: 'OGANI | Products Management',
            layout: 'auth',
            product: true,
        });
    },
    getUser: (req, res) => {
        res.render('admin', { 
            title: 'OGANI | Users Management',
            layout: 'auth',
            user: true,
        });
    },
    getStatistics: (req, res) => {
        res.render('admin', { 
            title: 'OGANI | Statistics',
            layout: 'auth',
            statistics: true,
        });
    },
    postAddCategory: async (req, res) => {
        try {
            const name = req.body.name.trim();
            const desc = req.body.desc.trim();
            const img = path.join('/img/uploads', req.file.filename);

            const categories = await categoryModel.getAllCategories();
            console.log(categories);

            await categoryModel.saveCategory(name, desc, img);

            res.redirect('/admin/category');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({
                message: 'Internal server error.'
            });
        }
    }

}