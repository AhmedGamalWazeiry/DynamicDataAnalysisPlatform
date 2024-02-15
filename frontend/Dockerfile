FROM node

WORKDIR /home/exampleapp

COPY package-lock.json ./

COPY package.json ./

RUN yarn install --prefer-offline --no-audit

RUN npm install 

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
