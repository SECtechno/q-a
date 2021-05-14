const models = require('../models');
const ids = require('../ids.js');

module.exports = {
  get: (req, res) => {
    models.questions.getQuestions(ids.generateRandomId(), (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(results);
    });
  },

  post: (req, res) => {
    const request = req.body;

    const params = [
      request.product_id,
      request.body,
      request.date,
      request.asker_name,
      request.asker_email];

    models.questions.addQuestion(params, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },

  updateHelpful: (req, res) => {
    models.questions.markQuestionHelpful(ids.generateRandomId(), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },

  updateReported: (req, res) => {
    models.questions.markReported(ids.generateRandomId(), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send();
      }
    });
  },

};
