const express = require('express');
const controller = require('./controllers');
const db = require('../db');
const ids = require('./ids.js');

const app = express();
const port = 3000;

app.use(express.json());




app.get('/qa/questions', controller.questions.get);
app.get(`/qa/questions/${ids.questionId}/answers`, controller.answers.get);
app.post('/qa/questions', controller.questions.post);
app.post(`/qa/questions/${ids.questionId}/answers`, controller.answers.post);
app.put(`/qa/questions/${ids.questionId}/helpful`, controller.questions.updateHelpful);
app.put(`/qa/answers/${ids.answerId}/helpful`, controller.answers.updateHelpful);
app.put(`/qa/questions/${ids.questionId}/report`, controller.questions.updateReported);
app.put(`/qa/answers/${ids.answerId}/report`, controller.answers.updateReported);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

