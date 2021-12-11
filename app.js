const express = require("express");
const fs = require('fs');
const path = require("path");
const app = express();
const port = 80;

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title':'Pubg is the best game',"content": con};
    res.status(200).render('index.pug',params);          
})

app.post('/',(req,res)=>{
    names = req.body.names;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    more = req.body.more;

    let outputToWrite = `The name of the client is ${names}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}.`;
    fs.writeFileSync('output.txt',outputToWrite);

    const params = {'message':'Your form has been submitted successfully'};
    res.status(200).render('index.pug',params);
})

app.listen(port,()=>{
    console.log(`This is application started successfully on port ${port}`);
})