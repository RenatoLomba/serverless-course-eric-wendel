FROM node:18.12.0

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start:dev"]
