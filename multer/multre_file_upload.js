const express = require("express");
var multer = require("multer");
const conn = require("./database/databse")
const userModel = require("./model/Schema")
const path = require('path');

const app = express();

var fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },

})
var upload = multer({
  storage: fileStorage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  }
  else {
    cb("Error : Images only")
  }
}


app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));



app.post('/upload', (req, res) => {
  upload(req, res, (err, result) => {
    if (err) {
      res.render('index', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!'
        });

      } else {
        // console.log(req.file)
        console.log({ "status": true, responsecode: 1, message: "file upload successfully.", data: req.file })

        res.render('index', {

          msg: 'File Uploaded!',


        });

        const finalemg = {
          fieldname: req.file.filename,
          originalname: req.file.originalname,
          destination: req.file.destination,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
        const newModel = new userModel(finalemg);
        return newModel.save().then(() => {
          console.log("file uploaded in database")
        }).catch((err) => {
          throw err
        })

      }
    }
  });
});

app.listen(1234, () => {
  console.log("Server listening the port no 1234")
})