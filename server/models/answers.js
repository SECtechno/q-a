const db = require('../../db');

module.exports = {
  getAnswers: (questionId, callback) => {
    const q = 'SELECT * FROM answers WHERE question_id = ?';
    db.query(q, questionId, (err, results) => {
      callback(err, results);
    });
  },

  addAnswer: (params, callback) => {
    const q = 'INSERT INTO answers (question_id, body, date, answerer_name, answerer_email) VALUES (?, ?, ?, ?, ?)';

    db.query(q, params, (err) => {
      callback(err);
    });
  },
};

