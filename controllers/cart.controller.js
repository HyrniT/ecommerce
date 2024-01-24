const cartModel = require('../models/cart.model');

module.exports = {
    getCart: async (req, res) => {
        const carts = await cartModel.getAllCartsByUser(req.user.id);
        const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);

        if (req.user) {
            res.render('cart', {
                cart: true,
                title: 'OGANI | Cart',
                name: req.user.name,
                carts: carts,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('cart', {
                cart: true,
                title: 'OGANI | Cart',
                name: null,
                carts: carts
            });
        }
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
    },
    getTotalCarts: async (req, res) => {
        try {
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            res.json({totalCarts: totalCarts.count});
        } catch (error) {
            console.error('Error:', error);
        }
    }
}