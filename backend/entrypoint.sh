#!/bin/bash

. $VENV_PATH/bin/activate

poetry run python manage.py makemigrations

poetry run python manage.py migrate

poetry run python manage.py collectstatic  --noinput --clear

poetry run python manage.py initadmin


exec "$@"
