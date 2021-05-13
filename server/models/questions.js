const db = require('../../db');

module.exports = {
  getQuestions: (productId, callback) => {
    const q = 'SELECT * FROM questions WHERE product_id = ?';
    db.query(q, productId, (err, results) => {
      callback(err, results);
    });
  },

  addQuestion: (params, callback) => {
    const q = 'INSERT INTO questions (product_id, body, date, asker_name, asker_email) VALUES (?, ?, ?, ?, ?)';

    db.query(q, params, (err) => {
      callback(err);
    });
  },
};
