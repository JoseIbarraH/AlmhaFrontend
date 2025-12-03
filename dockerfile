# 1. Build
FROM node:22-alpine AS build-stage
WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Serve with Nginx
FROM nginx:alpine AS production-stage

COPY --from=build-stage /src/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
