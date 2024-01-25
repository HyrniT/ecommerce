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
}

module.exports = new Order();