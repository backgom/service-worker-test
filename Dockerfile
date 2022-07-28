FROM node:16.16.0 as builder

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]