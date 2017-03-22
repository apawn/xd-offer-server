import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import './models/db.js';
import router from './router';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cookie
app.use(cookieParser());
// session
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
// static
app.use(express.static(__dirname + './dist'));
app.use(express.static(__dirname + './uploads'));
app.use(router);



app.listen(3000, () => {
    console.log("jk");
})

