FROM node:12 AS builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
RUN npm run build-prod

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/ui/ /usr/share/nginx/html/ui/
RUN echo "stonks-ui built"

EXPOSE 8000
EXPOSE 80