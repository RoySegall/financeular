FROM php:7.4-apache

# Set working directory.
ADD . /var/www/html
WORKDIR /var/www/html

# Install system dependencies.
RUN apt-get update && \
    apt-get install -y \
    git \
    curl \
    netcat \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PHP extensions.
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache default directories and the mood which give us clean urls.
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    a2enmod rewrite headers

# Running composer install and optimize it to production.
RUN composer install --optimize-autoloader --no-dev
RUN cp .env.docker .env

# Setting the logs permissions.
RUN chown -R root:www-data /var/www/html/storage && \
    chmod -R ug+w /var/www/html/storage && \
    composer dump-autoload

# Setting the correct permissions and triggering the entry point file.
RUN chmod +x /var/www/html/entrypoint.sh
CMD [ "/var/www/html/entrypoint.sh" ]
