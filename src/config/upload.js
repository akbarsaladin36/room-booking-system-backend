const multer = require('multer')
const path = require('path')
const helper = require('./helper')

const maxSize = 1 * 1000 * 1000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const fileName = helper.getTanggalIndonesia(new Date(Date.now)) + `-${file.fieldname}-` + Math.floor(10000 + Math.random() * 9999999) + ext
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  const listExt = ['.jpg', '.png', '.jpeg']
  const ext = path.extname(file.originalname).toLowerCase()
  if (listExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Extension must jpg, png, or jpeg'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
})

const uploadImage = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return helper.GetResponse(res, 401, err.message)
      } else if (err) {
        return helper.GetResponse(res, 401, err.message)
      }
      next()
    })
  }
}

module.exports = uploadImage