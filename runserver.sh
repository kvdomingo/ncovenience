#!/bin/sh

python manage.py collectstatic --noinput
gunicorn ncovenience.wsgi -b 0.0.0.0:$PORT --log-file -
