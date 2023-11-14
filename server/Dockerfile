FROM node:16-alpine

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 4000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
