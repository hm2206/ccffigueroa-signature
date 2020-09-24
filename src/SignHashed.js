const soap = require('soap');

  /**
   * Firmador de PDF
   * @param {String} uri url de api wfc
   * @param {String} Dni numero de documento del firmante
   * @param {String} ClavePfx clave del certificado pfx
   * @param {String} FileName Nombre del archivo PDF Ejem example.pdf
   * @param {String} ArchivoBase Archivo PDF en base64
   * @param {Object} Info Meta información para el placeholder el la firma digital
   * @param {String} Info.Reason Razón del firmante
   */
module.exports = (uri, Dni, ClavePfx, FileName, ArchivoBase, 
    Info = { Reason: "Yo soy el firmante", Location: 'PE', AddVisibleSign: true, PageSignature: 1, PathImg: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" }
  ) => {
  return new Promise((resolve, reject) => {
    // preparamos los args para enviar a la api wcf
    let payload = {
      Dni,
      ClavePfx,
      FileName,
      ArchivoBase,
      ...Info
    }
    // realizamos petición a la api
    soap.createClientAsync(uri)
    .then(client => {
      return client.SignHashedAsync(payload)
    }).then(result => {
      let [{SignHashedResult}] = result;
      let [link, direction] = `${SignHashedResult}`.split(';');
      let parsePath = `${direction}`.split('\\\\').pop();
      let fileName = `${link}/${parsePath}`.replace('\\', '/');
      return resolve({ 
        err: null,
        link: fileName
      })
    }).catch(err => reject({
      err,
      link: null
    }));
  }); 
}