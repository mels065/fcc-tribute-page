const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, '/static/html')));
app.use('/css', express.static(path.join(__dirname, '/static/css')));
app.use('/images', express.static(path.join(__dirname, '/static/images')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)

  if (process.send) process.send('online');
});
