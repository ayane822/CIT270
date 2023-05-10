const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();

const port = 3000;
const redisClient = Redis.createClient();

app.use(bodyParser.json()); //allow json reuests 

app.listen(port, () => {
    redisClient.connect();
    console.log("listening on port : " + port);
});

app.get('/' , (req, res) => {
    res.send("Welcome to your node server!");
    
});

app.post('/login' ,(req,res) =>{
 const loginBody = req.body;
 const userName = loginBody.userName;
 const password = loginBody.password;
if (password==="Kurokawa96@"){
    //This happends if the password is correct
    res.send("Welcome " + userName);
}else
    //This happends if the password is not correct
    res.status(401); //unauthorized
    res.send("Incorrect passowrd");

});