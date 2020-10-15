FROM ruby:2.5-alpine

RUN apk add --update alpine-sdk

# Install runtime dependencies in the container.
RUN apk add --update --virtual nodejs openjdk14

WORKDIR /tc39-website
EXPOSE 8000

CMD /bin/sh
