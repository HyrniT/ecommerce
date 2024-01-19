module.exports = {
    getHome: (req, res) => {
        res.render('index', { 
            title: 'Organi',
            layout: 'main',
            name: req.user ? req.user.name : null,
        });
    }
}