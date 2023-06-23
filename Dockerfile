FROM node:alpine

COPY package.json ./
COPY server.js ./

#instals 
RUN npm install 

EXPOSE 3000

#this happen after the container starts 
CMD ["node", "server.js"]