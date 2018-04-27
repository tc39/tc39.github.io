FROM ruby:2.5-alpine

RUN apk add --update alpine-sdk

WORKDIR /tc39-website
EXPOSE 8000

CMD /bin/sh
