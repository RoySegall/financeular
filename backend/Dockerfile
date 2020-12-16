FROM php:7.4-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache.
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions.
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands.

# Set working directory.
ADD . /var/www/html
WORKDIR /var/www/html

# 2. apache configs + document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 3. mod_rewrite for URL rewrite and mod_headers for .htaccess extra headers like Access-Control-Allow-Origin-
RUN a2enmod rewrite headers

# Running composer install.
RUN composer install --optimize-autoloader --no-dev

RUN cp .env.docker .env && php artisan config:cache && php artisan route:cache
#
RUN php artisan passport:keys

# Setting a sylink between the public folder and the main folder of apache.
RUN chown -R root:www-data /var/www/html/storage && \
    chmod -R ug+w /var/www/html/storage && \
    php artisan cache:clear && \
    composer dump-autoload

