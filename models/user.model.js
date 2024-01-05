const db = require("../utils/database.js");
const bcrypt = require('bcrypt');

class User {
    
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async createUser(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.one('INSERT INTO "Users" ("Username", "Password") VALUES ($1, $2) RETURNING "ID"', [username, hashedPassword]);
            return result.ID;
        } catch (error) {
            if (error.code === '23505') {
                throw new Error('Username already exists');
            }
            throw error;
        }
    }

    async getUser(username) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "Username" = $1', [username]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "ID" = $1', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async validateUser(username, password) {
        try {
            const result = await db.one('SELECT * FROM "Users" WHERE "Username" = $1', [username]);
            const match = await bcrypt.compare(password, result.Password);
            if (match) {
                return result.ID;
            }
            throw new Error('Invalid password');
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.one('UPDATE "Users" SET "Username" = $1, "Password" = $2 WHERE "ID" = $3 RETURNING "ID"', [username, hashedPassword, id]);
            return result.ID;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const result = await db.one('DELETE FROM "Users" WHERE "ID" = $1 RETURNING "ID"', [id]);
            return result.ID;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();