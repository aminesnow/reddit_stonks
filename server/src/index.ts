import express from 'express';
import { initialize } from 'express-openapi';
import apiDoc from './apiDoc/api-doc';
import path from 'path'
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';

if (process.env.ENV !== 'production') {    
    dotenvConfig({ path: __dirname + '/../.env' });
}
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = encodeURIComponent(process.env.MONGO_PASS || "");
const MONGO_DB = process.env.MONGO_DB;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

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
        app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
})
    }
    else {
        console.error(err);
        process.exit(1);
    }
});