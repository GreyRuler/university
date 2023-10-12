# Этап 1: Создание React-образа
FROM node:latest AS react

WORKDIR /app/laravel
COPY package.json package-lock.json /app/laravel/
RUN npm install
COPY /app/laravel .

WORKDIR /app/react
COPY resources/js/package.json resources/js/package-lock.json /app/react/
RUN npm install
RUN npm run build
COPY /app/react resources/js

# Этап 2: Создание composer образа
FROM composer:latest

WORKDIR /app/composer
RUN composer install --no-dev --optimize-autoloader
COPY /app/composer .

# Этап 3: Создание PHP-FPM-образа
FROM php:8.1-fpm
COPY . /var/www/html
