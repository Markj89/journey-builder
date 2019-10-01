'use strict';

const express = require('express');
const { resolve } = require('path');
//const morgan = require('morgan');
//const mongoose = require('mongoose');
//const session = require('express-session');
//const UUID = require('uuid');
const parser = require('body-parser');
const cors = require('cors');

/*mongoose.connect("mongodb://localhost:27017/serverdb", { useNewUrlParser: true }).then(
  () => {
    console.log('Database connection is sucessful')
  },
  error => {
    console.log('Error when connecting to the database' + error);
  }
);*/

const app = express();
const port = process.env.PORT || 3000;

//app.use(express.static('../../public'));
//app.use(morgan('combined'));
app.use(parser.json());
//app.use(parser.urlencoded({ extended: true }));
app.use(cors());

//const publicPath = resolve(__dirname, '../../public/index.html');
const dummyData = resolve(__dirname, 'content.json');

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', ['*']);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.sendFile(dummyData);
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
