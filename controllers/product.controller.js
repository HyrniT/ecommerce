const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');

module.exports = {
    getProduct: async (req, res) => {
        const id = req.query.id;
        const product = await productModel.getProductById(id);
        const relatedProducts = await productModel.getRelatedProducts(product.category_id, id);
        const categories = await categoryModel.getAllCategories();

        res.render('details', {
            shop: true,
            title: 'OGANI | Shop',
            name: req.user ? req.user.name : null,
            relatedProducts: relatedProducts,
            categories: categories,
            id: id,
            nameProduct: product.name,
            price: product.price,
            desc: product.desc,
            img: product.img,
            quantity: product.quantity,
        });
    }
}