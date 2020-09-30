const soap = require('soap');
const SignException = require('./SignException');

  /**
   * Firmador de PDF
   * @param {String} uri url de api wfc
   * @param {String} Dni numero de documento del firmante
   * @param {String} ClavePfx clave del certificado pfx
   * @param {String} FileName Nombre del archivo PDF Ejem example.pdf
   * @param {String} ArchivoBase Archivo PDF en base64
   * @param {Object} Info Meta información para el placeholder el la firma digital
   * @param {String} Info.Reason Razón del firmante
   * @param {String} Info.Location Locacion del firmante
   * @param {Boolean} Info.AddVisibleSign Firma visible
   * @param {Number} Info.PageSignature Numero de página a firmar
   * @param {String} Info.PathImg Ruta de la imagen para el placeholder
   * @param {Number} Info.PositionX posision x para la firma
   * @param {Number} Info.PositionY posision y para la firma
   * @param {Number} Info.Width ancho del rectangulo
   * @param {Number} Info.Height alto del rectangulo
   */
module.exports = (uri, Dni, ClavePfx, FileName, ArchivoBase, 
    Info = { 
      Reason: "Yo soy el firmante", 
      Location: 'PE', 
      AddVisibleSign: true, 
      PageSignature: 1, 
      PathImg: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      Pos: 0
    }
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
    }).catch(err => {
      try {
        throw new SignException(err);
      } catch (error) {
        reject({
          err: error,
          link: null
        })
      }
    });
  }); 
}