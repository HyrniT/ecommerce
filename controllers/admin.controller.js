// controllers/admin.controller.js
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
    postAddCategory: (req, res) => { 
        res.status(200).json({
            success: 'Files uploaded successfully.'
        });
    }
}