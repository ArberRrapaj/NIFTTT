FROM node:12-alpine

# Create app directory
WORKDIR /srv/app/nifttt-backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /srv/app/nifttt-backend/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . /srv/app/nifttt-backend/

EXPOSE 8080

CMD [ "npm", "start" ]