FROM node:18-alpine  


#woriking directory 
WORKDIR /app 


#copy all json file into working directory
COPY package*.json  ./

# ci means clean install
RUN npm ci


COPY . .

