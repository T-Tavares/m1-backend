import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

// MIDDLEWARE

app.use(cors());
app.use(express.json());

module.exports = app;
