const fs = require('fs');
const csv = require('fast-csv');
const db = require('../db');

const parseDate = (date) => {
  const dateAsInteger = parseInt(date);



  date = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (month <= 0) {
    month = 1;
  }

  const months = [4, 6, 9, 11];
  if (months.includes(month) && day === 31) {
    day = 30;
  }

  if (month === 2 && day >28) {
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
console.time('readFile');

const csvStream = csv.parseFile('./csv/questions.csv', {
  headers: true,
  escape: "'",
}).transform((record) => ({
  ...record,
  date: parseDate(record.date),
  helpful: addHelpful(record.helpful),
}))
  .on('data', (record) => {
    // console.log(record);
    const q = `INSERT INTO questions (product_id, body, date, asker_name, asker_email, reported, helpful) VALUES(${record.product_id}, '${record.body}', '${record.date}', '${record.asker_name}', '${record.asker_email}', ${record.reported}, ${record.helpful})`;
    db.query(q, (err) => {
      if (err) {
        throw err;
      }
      counter++;

      if (counter % 100 === 0) {
        console.log(counter);
      }
    });
  }).on('end', (count) => {
    console.log(`${count} rows successfully read`);
    console.timeEnd('readFile');
    db.end();
  })
  .on('error', (err) => {
    console.log(err);
  });
