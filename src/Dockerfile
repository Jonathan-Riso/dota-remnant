FROM node:latest
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY package.json /usr/src/
RUN npm install
COPY . /usr/src
RUN node deploy-commands.js
EXPOSE 3000
CMD ["node", "index.js"]