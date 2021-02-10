FROM node:12
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/src
RUN mkdir /var/log/reddit_momentum

WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY tsconfig.json /usr/src/app
COPY src /usr/src/app/src
RUN npm install
RUN npm run build
RUN rm -r /usr/src/app/node_modules
RUN rm -r /usr/src/app/src
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]