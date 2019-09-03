FROM jstacoder/gatsby-base-docker:latest

ADD ./package.json /app/
ADD ./yarn.lock /app/

RUN yarn install

ADD ./app/Seo.tpl.js /app/node_modules/gatsby-theme-docz/templates/
COPY . /app/
