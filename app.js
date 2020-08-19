const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

let public = path.resolve(__dirname,'public');
app.use(express.static(public));
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
let entries = [];
app.locals.entries = entries;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/new-entry',(req,res)=>{
    res.render('new-entry');
});
app.post('/new-entry',(req,res)=>{
    if(!req.body.tit || !req.body.content){
        res.status(400).send('Entries must have title and body.');
        return;
    }
    entries.push({
        tit: req.body.tit,
        content: req.body.content,
        publish: (new Date()).toDateString()
    });
    res.redirect('/');
});
app.use((req,res)=>{
    res.status(400).render('404');
});

http.createServer(app).listen(3300,()=>{
    console.log('Server is activated on port 3000');
})