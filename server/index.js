require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { todoRouter } = require('./routes/todo.js');

const app = express();

// Setup Express App
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Router for managing routes
app.use('/', todoRouter);

const port = process.env.PORT;

app.listen(port);