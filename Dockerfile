FROM ubuntu:latest

RUN apt upgrade && apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - &&\
apt-get install -y nodejs

RUN npm install --global yarn

COPY [".", "/usr/src"]
WORKDIR "/usr/src"

RUN yarn

CMD ["yarn", "dev"]