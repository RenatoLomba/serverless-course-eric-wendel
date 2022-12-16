FROM node:18.12.0

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . .

# RUN apt-get update
# RUN apt-get -y install jq

# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# RUN unzip awscliv2.zip
# RUN ./aws/install -i /usr/local/aws-cli -b /usr/local/bin

CMD ["yarn", "dev"]
