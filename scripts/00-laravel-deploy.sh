#!/usr/bin/env bash
ls -l

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Key generate..."
RUN php artisan key:generate --show
