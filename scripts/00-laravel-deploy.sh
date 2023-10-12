#!/usr/bin/env bash
echo "Install nodejs"
apt-get update && apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
apt-get update && apt-get install nodejs npm -y

ls -la

echo "Running composer"
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

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
