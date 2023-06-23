FROM node:alpine

WORKDIR /usr/app

COPY package.json /usr/app

COPY server.js /usr/app

#instals 
RUN npm install 

EXPOSE 3000

#this happen after the container starts 
CMD ["node", "server.js"]

