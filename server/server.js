const express = require('express');
const sseExpress = require('sse-express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/updates', sseExpress, function(req, res) {
  setInterval(function() {
    res.sse('update', {
      value: `New value ${Math.floor(Math.random() * 10000 + 1)}`,
      date: new Date(),
    });
  }, 2000);
});

const server = app.listen(5000, function() {
  console.log('CORS-enabled web server listening on port 5000');
});
