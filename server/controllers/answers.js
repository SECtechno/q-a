const models = require('../models');
const questionId = require('../app.js');

module.exports = {
  get: (req, res) => {
    models.answers.getAnswers(questionId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(results);
    });
  },

  post: (req, res) => {
    const request = req.body;
    console.log(request);
    const params = [
      request.question_id,
      request.body,
      request.date,
      request.answerer_name,
      request.answerer_email,
    ];
    models.answers.addAnswer(params, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },
};
