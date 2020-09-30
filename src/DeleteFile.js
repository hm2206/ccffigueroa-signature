const soap = require('soap');
const SignException = require('./SignException');

module.exports = (uri, Name, Dni) => {
    return new Promise((resolve, reject) => {
        soap.createClientAsync(uri)
        .then(client => {
            return client.DeleteFileAsync({ Name, Dni })
          }).then(result => {
            let [{DeleteFileResult}] = result;
            return resolve({ 
              err: null,
              result: DeleteFileResult
            })
          }).catch(err => {
            try {
              throw new SignException(err);
            } catch (error) {
              reject({
                err: error,
                result: null
              })
            }
          });
    });
}