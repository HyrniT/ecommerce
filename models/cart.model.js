const db = require("../utils/database.js");

class Cart {
    constructor(id, userId, productId, quantity) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    async saveCart(userId, productId, quantity) {
        try {
            const result = await db.one('INSERT INTO "Carts" ("user_id", "product_id", "quantity") VALUES ($1, $2, $3) RETURNING "id"', [userId, productId, quantity]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalNumberOfCartsByUser(userId) {
        try {
            const result = await db.one('SELECT COUNT(*) FROM "Carts" WHERE "user_id" = $1', [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllCartsByUser(userId) {
        try {
            const result = await db.any(`
            SELECT "Carts".*, "Products"."name" AS "product_name", "Products"."price" AS "product_price", "Products"."img" AS "product_img"
            FROM "Carts"
            INNER JOIN "Products" ON "Carts"."product_id" = "Products"."id"
            WHERE "Carts"."user_id" = $1
        `, [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getCartsInPageByUser(userId, page, perPage) {
        try {
            const result = await db.any(`
                    SELECT "Carts".*, Products.name AS product_name, Products.price AS product_price, Products.img AS product_img
                    FROM "Carts"
                    INNER JOIN "Products" ON "Carts"."product_id" = "Products"."id"
                    WHERE "Carts"."user_id" = $1
                    LIMIT $2 OFFSET $3
                `, [userId, perPage, (page - 1) * perPage]);
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const result = await db.one('SELECT * FROM "Carts" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(id, userId, productId, quantity) {
        try {
            const result = await db.result('UPDATE "Carts" SET "userId" = $1, "productId" = $2, "quantity" = $3 WHERE "id" = $4', [userId, productId, quantity, id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(id) {
        try {
            const result = await db.result('DELETE FROM "Carts" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllCartsByUser(userId) {
        try {
            const result = await db.result('DELETE FROM "Carts" WHERE "user_id" = $1', [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Cart();