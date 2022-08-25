#!/bin/sh

python manage.py collectstatic --noinput

gunicorn -b 0.0.0.0:$PORT -c ./gunicorn.conf.py
