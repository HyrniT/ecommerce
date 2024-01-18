module.exports = {
    getHome: (req, res) => {
        res.render('index', { 
            messages: res.locals.messages, 
            title: 'Home' ,
            layout: 'auth'
        });
    }
}