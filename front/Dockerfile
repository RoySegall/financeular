FROM node:12-alpine as build-stage

ADD . /app
WORKDIR /app

# Taking the args as passed from the and set them as an env file. We need to do
# this since the environment variable which are defined in the
# docker-compose.yml are not passed successfully.
ARG REACT_APP_BACKEND_ADDRESS
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_CLIENT_SECRET

ENV REACT_APP_BACKEND_ADDRESS $REACT_APP_BACKEND_ADDRESS
ENV REACT_APP_CLIENT_ID $REACT_APP_CLIENT_ID
ENV REACT_APP_CLIENT_SECRET $REACT_APP_CLIENT_SECRET

# installing the pakcages and build the front.
RUN npm i
RUN npm run build

# The second stage is to move to an nginx container so we could serve the react
# app.
FROM nginx:1.15.2-alpine

# Copy the compiled react app to the /var/www, which is the default directory of
# nginx. This would help us, without any furthure issues to serve the react app.
COPY --from=build-stage /app/build /var/www
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf

# Exposing port 80 and firing up the nginx.
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
