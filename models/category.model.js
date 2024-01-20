const db = require("../utils/database.js");

class Category {

    constructor(name, desc, img) {
        this.name = name;
        this.desc = desc;
        this.img = img;
    }

    async saveCategory(name, desc, img) {
        try {
            const result = await db.one('INSERT INTO "Categories" ("name", "desc", "img") VALUES ($1, $2, $3) RETURNING "id"', [name, desc, img]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const result = await db.any('SELECT * FROM "Categories"');
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Category();