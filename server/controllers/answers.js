const models = require('../models');
const questionId = require('../app.js');

const answerId = 369406;

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

  updateHelpful: (req, res) => {
    models.answers.markAnswerHelpful(answerId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },

  updateReported: (req, res) => {
    models.answers.markReported(answerId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },
};
