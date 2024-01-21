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

    async getCategoryById(id) {
        try {
            const result = await db.one('SELECT * FROM "Categories" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(id, name, desc, img) {
        try {
            if (img) {
                const result = await db.result('UPDATE "Categories" SET "name" = $1, "desc" = $2, "img" = $3 WHERE "id" = $4', [name, desc, img, id]);
                return result;
            } else {
                const result = await db.result('UPDATE "Categories" SET "name" = $1, "desc" = $2 WHERE "id" = $3', [name, desc, id]);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Category();