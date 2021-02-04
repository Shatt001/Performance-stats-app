'use strict';

require('dotenv').config()
const express = require('express');
const dbApi = require('./dbApi');

const PORT = process.env.API_PORT
const HOST = process.env.API_HOST

const app = express();

app.get('/getData', (req, res) => {
  const params = {
    group: req.query.group,
    user: req.query.user
  };

  dbApi.getData(params).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
    res.send('err');
  })
});

app.get('/getSelectors', (req, res) => {
  dbApi.getSelectors().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err)
    res.send('err');
  })
});

app.listen(PORT, () => {
  dbApi.initOracleClient();
  console.log(`Server platform: ${process.platform} Running on http://${HOST}:${PORT}`);
});
