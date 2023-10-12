FROM richarvey/nginx-php-fpm:3.1.6

# Этап 0: Установка nodejs
RUN sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
RUN sudo apt-get update && sudo apt-get install nodejs -y

# Этап 1: Установка js-зависимостей
WORKDIR /app/laravel
COPY package.json package-lock.json /app/laravel/
RUN npm install
COPY /app/laravel .

WORKDIR /app/react
COPY resources/js/package.json resources/js/package-lock.json /app/react/
RUN npm install
RUN npm run build
COPY /app/react resources/js

# Этап 2: Установка php-зависимостей
WORKDIR /app/composer
RUN composer install --no-dev --optimize-autoloader
COPY /app/composer .

COPY . .

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

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1
