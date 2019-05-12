const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Twitter = require('../models/Twitter');
const User = require("../models/User");
const config = require("../config/twitter_config.json");
const Twit = require('twit');
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: "Username Password combination does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

const twitter=new Twitter(config);

let twitterCred = null;
users.post('/statuses/home_timelines', (req,res)=>{
    twitterCred.getHomeTimeline({...req.body}, (err)=>{console.log('error', err); return res.send('error:'+ err)}, (data)=>{
        res.json(data);
    });
});


users.post('/twitter/verifycredentials', (req,res)=>{

    const {consumerKey, consumerSecret} = config;
    twitterCred = new Twitter({consumerSecret, consumerKey, ...req.body});

twitterCred.verifyCredentials({}, (err)=>{console.log('error', err); return res.send('error:'+ err)}, (data)=>{
        res.json(data);
    })
});


users.get('/twitter/oauth/request_token',(req, res)=>{
    twitter.getOAuthRequestToken((data)=>{
        res.json(data);
    })
});

users.post('/direct_messages/eventlist',(req, res)=>{
    twitterCred.getDirectMessagesEventList({...req.body}, (err)=>{console.log('error', err); return res.send('error:'+ err)}, (data)=>{
        res.json(data);
    });
});

users.post('/direct_messages/send',(req, res)=>{

    const {config:requestConfig, request} = req.body;
    const {consumerKey, consumerSecret} = config;
    const T = new Twit({consumer_key:consumerKey, consumer_secret:consumerSecret, ...requestConfig})
    
    T.post('direct_messages/events/new',{...request}, function(err, body, response){
        if(err){
            res.json({'error':err});
        }
        return res.json(body);
    });
});

users.post('/twitter/oauth/access_token',(oauth, res)=>{

    const request={...oauth.body};
    twitter.getOAuthAccessToken(request, ((data)=>{
        res.json(data);
    }));
    
});

module.exports = users;