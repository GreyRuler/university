FROM tangramor/nginx-php8-fpm:php8.2.2_node19.6.0 AS pre

COPY . .

WORKDIR /app
COPY . /app
RUN ls -l
RUN npm install

WORKDIR /app/resources/js
RUN ls -l
RUN npm install
RUN npm run build

WORKDIR /app
RUN ls -l
COPY . .

WORKDIR .
RUN ls -l

FROM richarvey/nginx-php-fpm:latest

COPY --from=pre . .
RUN ls -l

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

CMD ["/start.sh"]
