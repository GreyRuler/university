#!/usr/bin/env bash
#echo "Running composer"
#composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

composer -v
php -v
npm -v

#echo "Running install requirements for backend"
#npm install
#npm run build
#
#echo "Running install requirements for frontend"
#cd ./resources/js
#npm install
#
#echo "Caching config..."
#php artisan config:cache
#
#echo "Caching routes..."
#php artisan route:cache
#
#echo "Key generate..."
#php artisan key:generate --show
