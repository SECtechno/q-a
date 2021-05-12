const csv = require('fast-csv');
const db = require('../db');

const parseDate = (date) => {
  const dateAsInteger = parseInt(date);

  date = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (month <= 0) {
    month = 1;
  }

  const months = [4, 6, 9, 11];
  if (months.includes(month) && day === 31) {
    day = 30;
  }

  if (month === 2 && day > 28) {
    day = 27;
  }

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDate;
};

const addHelpful = (helpful) => {
  if (!helpful) {
    return 0;
  }
  return helpful;
};

let counter = 0;

// console.time('readFile');

const csvStream = csv.parseFile('./csv/answers.csv', {
  headers: true,
}).transform((record) => ({
  ...record,
  date: parseDate(record.date),
  helpful: addHelpful(record.helpful),
}))
  .on('data', (record) => {
    const q = `INSERT INTO answers (question_id, body, date, answerer_name, answerer_email, reported, helpful) VALUES(${record.question_id}, '${record.body}', '${record.date}', '${record.answerer_name}', '${record.answerer_email}', ${record.reported}, ${record.helpful})`;
    csvStream.pause();
    db.query(q, (err) => {
      if (err) {
        console.log(err);
      }

      counter++;

      if (counter % 100 === 0) {
        console.log(counter);
      }
      csvStream.resume();
    });
    // counter++;

    // if (counter % 5 === 0) {
    //   console.log(counter);
    // }
  })
  .on('end', (count) => {
    console.log(`${count} rows read`);
    // console.timeEnd('readFile');
  })
  .on('error', (err) => {
    console.log(err);
    db.end();
  });
