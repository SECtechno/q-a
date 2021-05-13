const models = require('../models');

module.exports = {
  get: (req, res) => {
    const productId = 2;
    models.questions.getQuestions(productId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(results);
    });
  },

  post: (req, res) => {
    const request = req.body;

    console.log(req);
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
};
