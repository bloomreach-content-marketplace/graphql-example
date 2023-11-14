FROM node:16-alpine

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 9000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
