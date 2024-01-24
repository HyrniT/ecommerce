const cartModel = require('../models/cart.model');

module.exports = {
    getCart: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;

        const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
        const totalPages = Math.ceil(totalCarts.count / perPage);
        const carts = await cartModel.getCartsInPageByUser(req.user.id, page, perPage);

        res.render('cart', {
            title: 'OGANI | Cart',
            name: req.user ? req.user.name : null,
            layout: '_',
            carts: carts,
            totalPages: totalPages,
            currentPage: page
        });
    },
    postAddCart: async (req, res) => {
        try {
            const productId = req.body.productId;
            const quantity = req.body.quantity;

            await cartModel.saveCart(req.user.id, productId, quantity);
            res.sendStatus(200);
        } catch (error) {
            console.error('Error:', error);
            res.sendStatus(500);
        }
    },
    postUpdateCart: async (req, res) => {
        try {
            const result = await cartModel.updateCart(req.body.cartId, req.user.id, req.body.productId, req.body.quantity);
            res.redirect('/cart');
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getDeleteCart: async (req, res) => {
        try {
            const result = await cartModel.deleteCart(req.body.cartId);
            res.redirect('/cart');
        } catch (error) {
            console.error('Error:', error);
        }
    }
}