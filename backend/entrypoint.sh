#! /bin/bash

# Check if DB exists.
echo "Waiting for DB connection"
while ! echo exit | nc -vz $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

php artisan passport:keys
php artisan config:cache
php artisan route:cache
php artisan cache:clear
php artisan storage:link
php artisan migrate --force
php artisan financeular:create-app --client_id=$CLIENT_ID --client_secret=$CLIENT_SECRET

apache2-foreground
