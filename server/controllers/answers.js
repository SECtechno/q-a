const models = require('../models');
const ids = require('../ids.js');

module.exports = {
  get: (req, res) => {
    models.answers.getAnswers(ids.generateRandomId(), (err, results) => {
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
    models.answers.markAnswerHelpful(ids.generateRandomId(), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },

  updateReported: (req, res) => {
    models.answers.markReported(ids.generateRandomId(), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },
};
