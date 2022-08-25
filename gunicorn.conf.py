wsgi_app = "ncovenience.wsgi"

worker_class = "gthread"
workers = 2
threads = 2
timeout = 30
graceful_timeout = 5
keepalive = 65

errorlog = "-"
accesslog = "-"
loglevel = "debug"
capture_output = True
