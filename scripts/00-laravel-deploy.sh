#!/usr/bin/env bash
ls -la

echo "Running composer"
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

ls -la

echo "Running install requirements for backend"
npm install
npm run build

echo "Running install requirements for frontend"
cd ./resources/js
npm install

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Key generate..."
php artisan key:generate --show
