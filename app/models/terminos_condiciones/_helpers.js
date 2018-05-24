import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '.pdf')
  }
})

const fileFilter = function (req, file, cb) {
  var filetypes = /pdf/
  var mimetype = filetypes.test(file.mimetype)
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  
  if (mimetype && extname) {
    return cb(null, true)
  }
  cb({message: 'File upload only supports the following filetypes - ' + filetypes})
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('TERMINOS_CONDICIONES')

function renameOldFile () {
  fs.rename('public/TERMINOS_CONDICIONES.pdf', 'public/TERMINOS_CONDICIONES_' + new Date().getTime() + '.pdf', err => {
    if(err) {
      // Do nothing, file doesn't seems to exist
    }
  })
}

function renameNewFile (file) {
  fs.rename(file.path, 'public/TERMINOS_CONDICIONES.pdf', err => {
    if(err) {
      // Do nothing, file doesn't seems to exist
    }
  })
}

/* Se exportan los métodos */
module.exports = {
  upload,
  renameOldFile,
  renameNewFile
}
