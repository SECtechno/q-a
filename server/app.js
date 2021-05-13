const express = require('express');
const controller = require('./controllers');

const app = express();
const port = 3000;

app.use(express.json());

const questionId = 54;
const answerId = 369406;

app.get('/qa/questions', controller.questions.get);
app.get(`/qa/questions/${questionId}/answers`, controller.answers.get);
app.post('/qa/questions', controller.questions.post);
app.post(`/qa/questions/${questionId}/answers`, controller.answers.post);
app.put(`/qa/questions/${questionId}/helpful`, controller.questions.updateHelpful);
app.put(`/qa/answers/${answerId}/helpful`, controller.answers.updateHelpful);
app.put(`/qa/questions/${questionId}/report`, controller.questions.updateReported);
app.put(`/qa/answers/${answerId}/report`, controller.answers.updateReported);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
