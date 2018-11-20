const express = require('express');
const app = express();

const folderPath = '/dist/algamoney-ui';

app.use(express.static(__dirname + folderPath));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + folderPath + '/index.html');
});

app.listen(process.env.PORT || 4200);
