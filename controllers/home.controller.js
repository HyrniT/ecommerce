module.exports = {
    getHome: (req, res) => {
        res.render('index', { 
            title: 'Organi',
            name: req.user ? req.user.name : null,
        });
    }
}