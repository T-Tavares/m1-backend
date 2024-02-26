// APP INIT() IMPORTS AND SETUP
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// .ENV VARIABLES
dotenv.config();

// APP
const app = express();

// GENERAL MIDDLEWARE
app.use(cors());
app.use(express.json());

// APP EXPORT
module.exports = app;
