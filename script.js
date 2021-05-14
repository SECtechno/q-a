import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
    { duration: '1s', target: 1000 },
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/qa/questions');
  check(res, {'status was 200': r => r.status == 200})
  sleep(1);
}
