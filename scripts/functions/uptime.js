const express = require('express');
const server = express();
const ejs = require("ejs");
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true })); 
ejs.delimiter = '%';

const session = require('express-session');
server.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 300000
}));
const clients = new MongoClient(process.env.DB);
exports.run =  (async => {
clients.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  let dbs = clients.db('website');

  console.log(dbs);
server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/../website'));
server.get('/style', function(req,res) {
  res.sendFile(__dirname + '/../website/style.css');
})
server.get('/', function(req,res) {
  var guest= {
  "login":"false",
"username":"guest",
"email":"guest@guest.tk",
"pasword":"guest"
  }
  var collection = dbs.collection('data');
  collection.find({"public":"true"}).sort({datefield: -1}).limit(7).project({ "title": { "$slice": [0,12] }, "description":{"$slice": [0, 14]} }).toArray(function(err, docs) {
  let posts = '';
 docs.forEach(post => {
  posts = posts + `<div class = "lastpost"><img src="/thumbail/guestposts.jpg"></img><h5>${post.title}</h5><p>${post.description}</p></div>`;
   });
   res.render(__dirname + '/../website/index.ejs', {
    "user":req.session.user || guest,
    "mposts":posts
  });
  });

  
});

server.get('/postthumbail', function(req,res) {
res.sendFile(__dirname + '/../website/thumbail/guestposts.jpg');
});
server.get('/blog', function(req,res) {
  var guest= {
  "login":"false",
"name":"guest",
"email":"guest@guest.tk",
"pasword":"guest"
  }
  res.render(__dirname + '/../website/index.ejs', {
    "user":req.session.user || guest,
  });
});

server.get('/login', function(req,res) {
  res.render(__dirname + '/../website/login.ejs', {
    "error":""
  });
});

server.post('/auth', function(req,res) {
    const collection = dbs.collection('users');
collection.find({ "name": req.body.username }).toArray(function(err, docs) {
     if(docs.length === 1) {
       docs.forEach(raw => {
         if(req.body.password == raw.password) {
           const data = {
 "login":"true",
"name":raw.name,
"nickname":raw.nickname,
"id":raw.id,
"email":raw.email,
"pasword":raw.password
           }
           console.log(data);
           req.session.user = data;
           res.redirect('/');
         }
       })
     }
    
           });

});
server.get('/scripts/jquery', function(req,res) {
  res.sendFile(__dirname + '/../website/scripts/jquery3.6.0.js');
});
server.get('/scripts/blockadblock', function(req,res) {
  res.sendFile(__dirname + '/../website/scripts/blockadblock.js');
})
server.listen(3000, ()=> console.log('ready'));
});
})