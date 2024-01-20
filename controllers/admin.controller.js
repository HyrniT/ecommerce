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
    getCategory: (req, res) => {
        res.render('admin', { 
            title: 'OGANI | Categories Management',
            layout: 'auth',
            category: true,
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
            const img = req.file.filename;

            await categoryModel.saveCategory(name, desc, img);

            res.status(200).json({
                message: 'Category uploaded successfully.',
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }

}