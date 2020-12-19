FROM node:12-alpine as build-stage

ADD . /app
WORKDIR /app

ARG REACT_APP_BACKEND_ADDRESS
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_CLIENT_SECRET

ENV REACT_APP_BACKEND_ADDRESS $REACT_APP_BACKEND_ADDRESS
ENV REACT_APP_CLIENT_ID $REACT_APP_CLIENT_ID
ENV REACT_APP_CLIENT_SECRET $REACT_APP_CLIENT_SECRET

RUN npm i
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build-stage /app/build /var/www
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
