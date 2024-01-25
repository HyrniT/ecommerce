const db = require("../utils/database.js");

class Order {
    constructor(userId, orderedDate, total) {
        this.userId = userId;
        this.orderedDate = orderedDate;
        this.total = total;
    }

    async saveOrder(userId, total) {
        this.orderedDate = new Date();
        try {
            const result = await db.one('INSERT INTO "Orders" ("user_id", "ordered_date", "total") VALUES ($1, $2, $3) RETURNING "id"', [userId, this.orderedDate, total]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalRevenueByCategory() {
        try {
            const result = await db.any(`
            SELECT "Categories"."name" AS "category_name", SUM("Products"."price" * "Carts"."quantity") AS "total_revenue"
            FROM "Carts"
            INNER JOIN "Products" ON "Carts"."product_id" = "Products"."id"
            INNER JOIN "Categories" ON "Products"."category_id" = "Categories"."id"
            GROUP BY "Categories"."name"    
            `)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalQuantityByCategory() {
        try {
            const result = await db.any(`
            SELECT "Categories"."name" AS "category_name", SUM("Carts"."quantity") AS "total_quantity"
            FROM "Carts"
            INNER JOIN "Products" ON "Carts"."product_id" = "Products"."id"
            INNER JOIN "Categories" ON "Products"."category_id" = "Categories"."id"
            GROUP BY "Categories"."name"    
            `)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalRevenueByMonth() {
        try {
            const result = await db.any(`
            SELECT DATE_PART('month', "Orders"."ordered_date") AS "order_month", SUM(total) AS "total_revenue"
            FROM "Orders"
            GROUP BY DATE_PART('month', "Orders"."ordered_date")
            ORDER BY DATE_PART('month', "Orders"."ordered_date") ASC
            `)
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Order();