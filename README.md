# Ejemplo

```js 

const fs = require('fs');
const path = require('path');
const {  } = require('ccffigueroa-signature');

let pdf = fs.readFileSync(path.join(__dirname, 'example.pdf'), 'base64');
let url = 'http://192.168.100.7:8143/WsFirmaDigital.svc?singleWsdl';

SignHashed(url, "44156039", "passP12", "example.pdf", pdf)
    .then(res => console.log(res))
    .catch(err => console.log(err));

```