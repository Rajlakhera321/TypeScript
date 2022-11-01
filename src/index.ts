import express, {Request,Response} from "express";
import {router} from './routers/users';
import connects from './config/db'
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;

connects();

app.use('/home',router);

app.listen(port, ():void=> console.log(`This index is running on port number: ${port}`))