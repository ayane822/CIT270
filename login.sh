echo "Logging in"

curl  --insecure -v -d "@login.json" POST -H "Content-Type:application/json" https://aya.cit270.com/login
##POST means pushing something to website


##curl -v http://dev.stedi.me/validate/918c8229-fe39-4a70-8ec0-871b79d3f1d4 ## -> get the authentication token 
## curl is to get client URL. port is either 443 or 80.
## https -> encrypted web trafic -> port 443, http -> not encrypted port 80    
##I get different token everytime I log in 


