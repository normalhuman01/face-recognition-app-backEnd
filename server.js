const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'butwhopraysforsatan',
        database : 'smartbrain'
    }
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{ res.send('Success') });

app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, database, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, database, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, database) });

app.put('/image', (req, res) => { image.handleImage(req, res, database) });

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () =>{
    console.log(`App is runing on port ${process.env.PORT}`);
});
