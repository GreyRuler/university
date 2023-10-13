FROM tangramor/nginx-php8-fpm:php8.2.2_node19.6.0

COPY . .

WORKDIR /app
COPY . /app
RUN ls -l
RUN npm install
RUN composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

WORKDIR /app/resources/js
RUN ls -l
RUN npm install
RUN npm run build

WORKDIR /app
RUN ls -l
COPY . .

WORKDIR .
RUN ls -l

RUN echo "Caching config..."
RUN php artisan config:cache
RUN echo "Caching routes..."
RUN php artisan route:cache
RUN echo "Key generate..."
RUN php artisan key:generate --show


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
