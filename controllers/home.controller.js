// controllers/home.controller.js

module.exports = {
    getHome: (req, res) => {
        res.render('index', { 
            title: 'OGANI | Home',
            name: req.user ? req.user.name : null,
        });
    }
}