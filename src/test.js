const { SignHashed } = require('./index');
const fs = require('fs');
const path = require('path');

let pdf = fs.readFileSync(path.join(__dirname, 'example[R].pdf'), 'base64');
let url = 'http://192.168.100.7:8143/WsFirmaDigital.svc?singleWsdl';

SignHashed(url, "44156036", "joserogelio", "testing_firma_2.pdf", pdf)
    .then(res => console.log(res))
    .catch(err => console.log(err.err.message));