const express = require('express')
const app = express();
const bodyParser = require('body-parser'); // middleware
require("dotenv").config();
const PORT = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cors = require('cors')
app.use(cors());

const clients = require('./router/client.router')
app.use('/', clients)


app.listen(3000)