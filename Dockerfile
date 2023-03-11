FROM ubuntu:latest

RUN apt upgrade && apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - &&\
apt-get install -y nodejs

RUN npm install --global yarn typescript

COPY [".", "/usr/src"]
WORKDIR "/usr/src"

RUN yarn

ARG NODE_ENV

CMD if [ "$NODE_ENV" = "development" ] ; then yarn dev ; else yarn start ; fi
