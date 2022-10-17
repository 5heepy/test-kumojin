FROM node:16-bullseye-slim as builder
WORKDIR /app
ENV NODE_ENV production
COPY . .
RUN npm ci --only=production
RUN npm run build

FROM nginx:mainline-alpine
ENV WORKDIR /app
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder $WORKDIR/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
