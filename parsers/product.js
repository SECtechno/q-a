const fs = require('fs');
const csv = require('fast-csv');
const db = require('../db');

let counter = 0;

console.time('readFile');

const csvStream = csv.parseFile('./csv/product.csv', {
  headers: true,
}).transform((record) => ({
  ...record,
}))
  .on('data', (record) => {
    const q = `INSERT INTO products (name) VALUES('${record.name}')`;
    db.query(q, record, (err) => {
      if (err) {
        throw err;
      }
      counter ++;

      if(counter % 100 === 0) {
        console.log(counter);
      }
    })
  }).on('end', (count) => {
    console.log(`${count} rows successfully read`);
    console.timeEnd('readFile');
    db.end();
  }).on('error', err => {
    console.log(err);
  });
