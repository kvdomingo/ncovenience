import os
from django.templatetags.static import static
from django.urls import reverse
from django.conf import settings
from jinja2 import Environment
from datetime import datetime


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'now': datetime.now(),
        'settings': settings,
        'static': static,
        'url': reverse,
    })
    return env
