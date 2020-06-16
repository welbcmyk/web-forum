FROM mhart/alpine-node:12.16.1

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE  3000

ENTRYPOINT ["npm", "start"]