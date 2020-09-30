const { SignHashed, DeleteFile } = require('./index');
const fs = require('fs');
const path = require('path');

let pdf = fs.readFileSync(path.join(__dirname, 'example.pdf'), 'base64');
let url = 'http://192.168.100.7:8143/WsFirmaDigital.svc?singleWsdl';

// crear archivo
SignHashed(url, "44156036", "joserogelio", "testing_firma_2.pdf", pdf)
    .then(res => name = res.name)
    .catch(err => console.log(err.err.message));


// crear y  eliminar archivo
SignHashed(url, "44156036", "joserogelio", "testing_firma_3.pdf", pdf)
    .then(res => {
        DeleteFile(url, res.name, "44156036")
            .then(res => console.log(res.result))
            .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.err.message));