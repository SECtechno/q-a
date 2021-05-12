const fs = require('fs');
const csv = require('fast-csv');
const db = require('../db');

let counter = 0;

console.time('readFile');
const csvStream = csv.parseFile('./csv/qsSample.csv', {
  headers: true,
}).transform((record) => ({
  ...record,
}))
  .on('data', (record) => {
    const q = `INSERT INTO users (name, email) VALUES('${record.asker_name}', '${record.asker_email}')`;
    db.query(q, (err) => {
      if(err) {
        throw err;
      }
      counter++;

      if(counter % 100 === 0) {
        console.log(counter);
      }
    })
  }).on('end', (count) => {
    console.log(`${count} rows read`);
    console.timeEnd('readFile');
    db.end();
  }).on('error', err => {
    console.log(err);
  });
