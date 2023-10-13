#!/usr/bin/env bash
#echo "Running composer"
#composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

ls -l

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force


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
