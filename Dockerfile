# Build stage
FROM node:lts-alpine as build-stage
ENV HTTP_PROXY http://10.253.106.8:3128
ENV HTTPS_PROXY http://10.253.106.8:3128
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final image
FROM nginx:1.16.1-alpine as production-stage
RUN chmod 777 /etc/nginx/conf.d
#COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
