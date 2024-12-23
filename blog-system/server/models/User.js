const db = require('../config/db');

class User {
  static async findByUsername(username) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { username, email, password, googleId } = userData;
      const [result] = await db.execute(
        'INSERT INTO users (username, email, password, googleId) VALUES (?, ?, ?, ?)',
        [username, email, password, googleId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;