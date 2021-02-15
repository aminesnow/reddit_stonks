import express from 'express';
import { initialize } from 'express-openapi';
import apiDoc from './apiDoc/api-doc';
import path from 'path'
import mongoose from 'mongoose';
import { getEnvVar } from './services/env.service'
import * as bodyParser from "body-parser";

import jwt from 'express-jwt';

const MONGO_USER = getEnvVar("MONGO_USER");
const MONGO_PASS = encodeURIComponent(getEnvVar("MONGO_PASS") || "");
const MONGO_DB = getEnvVar("MONGO_DB");
const MONGO_URL = getEnvVar("MONGO_URL");
const SERVER_PORT = getEnvVar("SERVER_PORT");
const JWT_SECRET = getEnvVar("JWT_SECRET") || "";

const app = express();

// Using expressJwt module on /api/private subroutes to validate authentication
app.use('/api/stonks', jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }));

app.use(bodyParser.json());

initialize({
    apiDoc: apiDoc,
    app,
    pathsIgnore: /\.doc$/,
    paths: path.resolve(__dirname, 'handlers'),
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
});

app.use(((err, req, res, next) => {
    res.status(err.status).json(err);
}) as express.ErrorRequestHandler);


// MongoDB
const dbUrl = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:27017/${MONGO_DB}`;
const options = {
    //server: { auto_reconnect: true },
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connection.on('connecting', function () {
    console.log('Database connecting');
});

mongoose.connect(dbUrl, options, (err) => {
    if (!err) {
        console.log('Database connection established');

        // Launch
        app.listen(SERVER_PORT, () => {
        console.log('The application is listening on port ' + SERVER_PORT);
})
    }
    else {
        console.error(err);
        process.exit(1);
    }
});