const db = require('../config/db');

const Blog = {
  create: async (blogData) => {
    try {
      console.log('Received blog data:', blogData); 
      const [result] = await db.execute(
        'INSERT INTO blogs (user_id, keywords, sentence, generated_content) VALUES (?, ?, ?, ?)',
        [blogData.userId, blogData.keywords, blogData.sentence, blogData.generatedContent]
      );
      console.log('Insert result:', result); 
      return result;
    } catch (error) {
      console.error('Database error:', error); 
      throw error;
    }
  },


  getByUserId: async (userId) => {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Blog;