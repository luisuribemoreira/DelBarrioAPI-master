import { upload, renameOldFile, renameNewFile } from './_helpers'

/**
 * Agregar nuevo teléfono.
 * @param {integer} req.body.CODI_FONO - Código estandarizado de fono, el cual define si es fijo o móvil.
 * @param {string} req.body.NUMR_FONO - Número de teléfono.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario dueño del teléfono.
 * @return {json} Teléfono. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  upload(req, res, err => {
    if(req.file) {
      if(err) {
        res.status(500).json({ error: true, data: err })
      } else {
        renameOldFile()
        renameNewFile(req.file)
        res.json({error: false, data: { message: 'File uploaded' } })
      }
    } else {
      res.status(400).json({ error: true, data: { message: 'TERMINOS_CONDICIONES file is required in pdf format'} })
    }
  })
}

/* Se exportan los métodos */
module.exports = {
  POST,
}
