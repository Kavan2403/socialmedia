// load modules
const express = require('express');
const exphbs = require('express-handlebars');
// connect to monfo uri
const keys = require('./config/keys');
const User = require('./models/user');
require('./passport/google-passport');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
//initialize application
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());
app.use(session({ 
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})


// setup template engine
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars')
app.use(express.static('public'));
const port = process.env.port || 3000;

mongoose.Promise = global.Promise;

mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('connected');
}).catch((err) => {
    console.log(err)
})

app.get('/',(req, res) =>{
    res.render('home');
});

app.get('/about',(req,res) =>{
    res.render('about');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

app.get('/profile', async(req,res) => {
    User.findById({_id:req.user._id})
    .then((user) =>{
        res.render('profile',{
            user:user.toObject(),
        });
    })
});
app.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})


app.listen(port,()=> {
    console.log(`localhost:${port}`);
});