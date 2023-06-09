require('dotenv').config();
const http = require('http');
const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');

// Routes
const auth = require('./routes/auth.js');
const offert = require('./routes/offert.js');

const PORT = process.env.PORT || '3001';

const app = express();

const client = new MongoClient(process.env.MONGO_URI);

const db = client.db('sample_airbnb');

app.use(express.json({
    extended: true
}));

app.use(cors());

app.use('/auth', auth(db));
app.use('/offert', offert(db));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK'
    });
});

http.createServer(app)
    .listen(PORT, () => {
        console.log('API start at port %s', PORT);

        client.connect().then(() => {
            console.log('Database connected');
        });
    });