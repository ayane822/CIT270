const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();
const { createHash } = require('node:crypto');
const fs = require('fs')
const https = require('https');
const { connect } = require('node:http2');
//...
https.createServer({
  key: fs.readFileSync('privkey1.pem'), //This is a private key 
  cert: fs.readFileSync('cert1.pem'),
  chain:fs.readFileSync('fullchain1.pem')//This is a self-signed ceriticated.
}, app).listen(3000, () => {
  redisClient.connect();
  console.log('Listening...')
})

const port = 3000;
const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'}); 

app.use(bodyParser.json()); //allow json reuests 

// app.listen(port, () => {
//     redisClient.connect(); //the Api server is trying to connect with redis 
//     console.log("listening on port : " + port);
// });

app.get('/' , (req, res) => {
    res.send("Welcome to your node server!");
    
});

app.post('/login', async (req,res) =>{ //async -> 
 const loginBody = req.body;
 const userName = loginBody.userName;
 const password = loginBody.password; // we need to hash the password the users gave us
 const hashedpassword = password==null? null : createHash('sha3-256').update(password).digest('hex');
 console.log("Hashed Password: " +hashedpassword);
 const redisPassword =  password==null? null : await redisClient.hGet('hashedpasswords' , userName);
 console.log("password for "+userName+" " + redisPassword);
if (hashedpassword ===redisPassword){
    //This happends if the password is correct
    res.send("Welcome " + userName);
}else {
    //This happends if the password is not correct
    res.status(401); //unauthorized
    res.send("Incorrect passowrd");

}});

//app.