FROM node:14 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \ 
    && npm i -g @nestjs/cli

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "test" ]

FROM node:14 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production \ 
    && npm i -g @nestjs/cli

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]