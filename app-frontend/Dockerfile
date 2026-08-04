FROM nginx:1.30.4-alpine3.24

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
RUN nginx -t

EXPOSE 80
