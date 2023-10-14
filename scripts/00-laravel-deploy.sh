#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Key generate..."
php artisan key:generate --show

#apt update && apt install openssh-server sudo -y
#useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 test
#
#echo 'test:test' | chpasswd
#
#service ssh start
#
#/usr/sbin/sshd -D

php --ini
