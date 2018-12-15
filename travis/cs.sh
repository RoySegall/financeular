#!/usr/bin/env bash
cd backend
vendor/bin/phpcs src --standard=PSR2 --colors
