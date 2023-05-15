const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();

const port = 3000;
const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'}); 

app.use(bodyParser.json()); //allow json reuests 

app.listen(port, () => {
    redisClient.connect(); //the Api server is trying to connect with redis 
    console.log("listening on port : " + port);
});

app.get('/' , (req, res) => {
    res.send("Welcome to your node server!");
    
});

app.post('/login', async (req,res) =>{ //async -> 
 const loginBody = req.body;
 const userName = loginBody.userName;
 const password = loginBody.password;
 const redisPassword = await redisClient.hGet('users' , userName);
 console.log("password for "+userName+" " + redisPassword);
if (redisPassword!=null && password===redisPassword){
    //This happends if the password is correct
    res.send("Welcome " + userName);
}else
    //This happends if the password is not correct
    res.status(401); //unauthorized
    res.send("Incorrect passowrd");

});