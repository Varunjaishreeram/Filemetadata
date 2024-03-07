
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()
const express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Retrieve file information from req.file object
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Send JSON response containing file name, type, and size
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
