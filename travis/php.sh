#!/usr/bin/env bash
cd backend
composer self-update
mysql -e 'CREATE DATABASE tahini;'
rm phpunit.xml.dist
cp .travis.env .env
cp .travis.phpunit.xml.dist phpunit.xml.dist
composer install
bin/console doctrine:schema:create
