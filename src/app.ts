// APP INIT() IMPORTS AND SETUP
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// .ENV VARIABLES
dotenv.config();

// APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('noice');
});

// APP EXPORT
module.exports = app;
