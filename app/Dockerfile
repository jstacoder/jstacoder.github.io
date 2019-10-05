FROM jstacoder/gatsby-base-docker:latest

RUN adduser docker -q

RUN chown docker:docker /home/docker

USER docker

ENV HOME=/home/docker

RUN mkdir -p ${HOME}


ADD ./package.json ${HOME}

ADD ./yarn.lock ${HOME}

WORKDIR ${HOME}

RUN yarn install

ADD ./app/Seo.tpl.js $HOME/node_modules/gatsby-theme-docz/templates/

WORKDIR /app
#COPY . /app/
