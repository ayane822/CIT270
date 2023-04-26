echo "Logging in"

curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login
##POST means pushing something to website
curl https://dev.stedi.me/validate/918c8229-fe39-4a70-8ec0-871b79d3f1d4 
    
