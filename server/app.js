const express = require('express');
const controller = require('./controllers');

const app = express();
const port = 3000;

app.use(express.json());

const questionId = 54;

app.get('/qa/questions', controller.questions.get);
app.get(`/qa/questions/${questionId}/answers`, controller.answers.get);
app.post('/qa/questions', controller.questions.post);
app.post(`/qa/questions/${questionId}/answers`, controller.answers.post);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
