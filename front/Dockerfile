FROM node:12-alpine as build-stage

ADD . /app
WORKDIR /app

RUN npm i
RUN mv .docker.env .env
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build-stage /app/build /var/www
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
