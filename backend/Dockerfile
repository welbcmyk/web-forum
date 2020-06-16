FROM mhart/alpine-node:12.16.1

WORKDIR /backend

COPY package*.json /backend/

RUN npm install -g nodemon

RUN npm install

COPY . /backend/

EXPOSE  5000

ENTRYPOINT ["npm", "start"]