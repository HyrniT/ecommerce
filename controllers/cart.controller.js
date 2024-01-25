const cartModel = require('../models/cart.model');
const categoryModel = require('../models/category.model');
const orderModel = require('../models/order.model');

module.exports = {
    getCart: async (req, res) => {
        const carts = await cartModel.getAllCartsByUser(req.user.id);
        const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
        const categories = await categoryModel.getAllCategories();

        if (req.user) {
            res.render('cart', {
                cart: true,
                title: 'OGANI | Cart',
                name: req.user.name,
                categories: categories,
                carts: carts,
                totalCarts: totalCarts.count
            });
        } else {
            res.render('cart', {
                cart: true,
                title: 'OGANI | Cart',
                name: null,
                categories: categories,
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
            const id = req.query.id;
            await cartModel.deleteCart(id);
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
    },
    getCheckout: async (req, res) => {
        try {
            const carts = await cartModel.getAllCartsByUser(req.user.id);
            const totalCarts = await cartModel.getTotalNumberOfCartsByUser(req.user.id);
            const categories = await categoryModel.getAllCategories();

            if (req.user) {
                res.render('checkout', {
                    checkout: true,
                    title: 'OGANI | Checkout',
                    name: req.user.name,
                    categories: categories,
                    carts: carts,
                    totalCarts: totalCarts.count
                });
            } else {
                res.render('checkout', {
                    checkout: true,
                    title: 'OGANI | Checkout',
                    name: null,
                    categories: categories,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
    postOrder: async (req, res) => {
        try {
            const total = req.body.total;

            await orderModel.saveOrder(req.user.id, total);
            await cartModel.deleteAllCartsByUser(req.user.id);

            res.sendStatus(200);
        } catch (error) {
            console.error('Error:', error);
            res.sendStatus(500);
        }
    }
}