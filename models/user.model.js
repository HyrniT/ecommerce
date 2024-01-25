const db = require("../utils/database.js");
const bcrypt = require('bcrypt');

class User {
    
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async createUser(name, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.one('INSERT INTO "Users" ("username", "password", "name", "status") VALUES ($1, $2, $3) RETURNING "id"', [username, hashedPassword, name, true]);
            return result;
        } catch (error) {
            if (error.code === '23505') {
                throw new Error('Username already exists');
            }
            throw error;
        }
    }

    async createGoogleUser(email, name) {
        try {
            const result = await db.one('INSERT INTO "Users" ("email", "name", "status") VALUES ($1, $2, $3) RETURNING "id"', [email, name, true]);
            return result;
        } catch (error) {
            if (error.code === '23505' || error.code === '42601') {
                const result = await this.getUserByEmail(email);
                return result;
            }
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "email" = $1', [email]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "username" = $1', [username]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "id" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async validateUser(username, password) {
        try {
            const result = await this.getUserByUsername(username);
            const match = await bcrypt.compare(password, result.password);
            if (match) {
                return result;
            }
            throw new Error('Invalid password');
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.one('UPDATE "Users" SET "username" = $1, "password" = $2 WHERE "id" = $3 RETURNING "id"', [username, hashedPassword, id]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const result = await db.one('DELETE FROM "Users" WHERE "id" = $1 RETURNING "id"', [id]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    async getTotalNumberOfUsers() {
        try {
            const result = await db.one('SELECT COUNT(*) FROM "Users" WHERE "username" != $1', ['admin']);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUsersInPage(page, perPage) {
        try {
            const result = await db.any('SELECT * FROM "Users" WHERE "username" != $1 LIMIT $2 OFFSET $3', ['admin', perPage, (page - 1) * perPage]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async lockUser(id) {
        try {
            const result = await db.one('UPDATE "Users" SET "status" = $1 WHERE "id" = $2 RETURNING "id"', [false, id]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    async unlockUser(id) {
        try {
            const result = await db.one('UPDATE "Users" SET "status" = $1 WHERE "id" = $2 RETURNING "id"', [true, id]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();