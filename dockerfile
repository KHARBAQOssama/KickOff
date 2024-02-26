FROM node:20-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN mkdir /opt/kickoff
WORKDIR /opt/kickoff
ENV PATH /opt/kickoff/.bin:$PATH
COPY ./package.json ./package-lock.json ./
RUN npm install

WORKDIR /opt/kickoff/app

COPY . .

CMD ["npm","start"]