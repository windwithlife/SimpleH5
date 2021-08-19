FROM node:12.19.0-alpine
MAINTAINER Joe

RUN mkdir -p /runDIR/web
COPY ./ /runDIR/web 
ENV HOST 0.0.0.0
ENV PORT 80
WORKDIR /runDIR/web
EXPOSE 8080 80

ENTRYPOINT ["npm","prod"]

