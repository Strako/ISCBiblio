const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//ROUTES

const admins = require('./api/routes/admins');
app.use('/admins', admins);

const signin = require('./api/routes/signin');
app.use('/signin', signin);

const test = require('./api/routes/test');
app.use('/test', test);

const books = require('./api/routes/books');
app.use('/books', books);

const members = require('./api/routes/members');
app.use('/members', members);


module.exports = app;