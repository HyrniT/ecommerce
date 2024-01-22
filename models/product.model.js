const db = require("../utils/database.js");

class Product {
    constructor(name, price, desc, img, quantity, categoryId) {
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.img = img;
        this.categoryId = categoryId;
        this.quantity = quantity;
    }

    async saveProduct(name, desc, price, img, quantity, categoryId) {
        try {
            const result = await db.one('INSERT INTO "Products" ("name", "desc", "price", "img", "quantity", "category_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id"', [name, price, desc, img, quantity, categoryId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const result = await db.any('SELECT * FROM "Products"');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const result = await db.one('SELECT * FROM "Products" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, name, desc, price, img, quantity, categoryId) {
        try {
            if (img) {
                const result = await db.result('UPDATE "Products" SET "name" = $1, "desc" = $2, "price" = $3, "img" = $4, "quantity" = $5, "category_id" = $6 WHERE "id" = $7', [name, desc, price, img, quantity, categoryId, id]);
                return result;
            } else {
                const result = await db.result('UPDATE "Products" SET "name" = $1, "desc" = $2, "price" = $3, "quantity" = $4, "category_id" = $5 WHERE "id" = $6', [name, desc, price, quantity, categoryId, id]);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async getTotalNumberOfProducts() {
        try {
            const result = await db.one('SELECT COUNT(*) FROM "Products"');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalNumberOfProductsByCategory(categoryId) {
        try {
            const result = await db.one('SELECT COUNT(*) FROM "Products" WHERE "category_id" = $1', [categoryId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductInPage(page, perPage) {
        try {
            const result = await db.any('SELECT * FROM "Products" LIMIT $1 OFFSET $2', [perPage, (page - 1) * perPage]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductInPageByCategory(page, perPage, categoryId) {
        try {
            const result = await db.any('SELECT * FROM "Products" WHERE "category_id" = $1 LIMIT $2 OFFSET $3', [categoryId, perPage, (page - 1) * perPage]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const result = await db.result('DELETE FROM "Products" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductByCategory(categoryId) {
        try {
            const result = await db.any('SELECT * FROM "Products" WHERE "category_id" = $1', [categoryId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Product();