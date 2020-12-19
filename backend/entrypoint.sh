#! /bin/bash

# Waiting for the DB to be ready. It's not enough that the container need to
# be ready for us, we need to make sure the mysql service is ready for action.
echo "Waiting for DB connection"
while ! echo exit | nc -vz $MYSQL_HOST $MYSQL_PORT;
do
    echo "DB still off-line....";
    sleep 10;
done
echo "DB is online"

# Preparing the passport keys and clearing the cache.
php artisan passport:keys
php artisan cache:clear

# Caching the config and the route and create a storage link.
php artisan config:cache
php artisan route:cache
php artisan storage:link

# Migrating with force since this is a production environment, laravel make sure
# we don't do stupid stuff, and create a docker app.
php artisan migrate --force
php artisan financeular:create-app --client_id=$CLIENT_ID --client_secret=$CLIENT_SECRET

# Fire up apache in the background.
apache2-foreground
