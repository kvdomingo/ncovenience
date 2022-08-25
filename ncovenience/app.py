import os.path

from cache import cache
from flask import Flask, send_from_directory

from .blueprints import api
from .config import BASE_DIR, PYTHON_ENV, SECRET_KEY


def create_app():
    app = Flask(__name__, static_url_path="/", static_folder=BASE_DIR / "web" / "app")
    app.config.from_mapping(DEBUG=PYTHON_ENV != "production", SECRET_KEY=SECRET_KEY)
    app.register_blueprint(api)
    cache.init_app(app)

    if PYTHON_ENV == "production":

        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        def serve(path: str):
            if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
                return send_from_directory(app.static_folder, path)
            return send_from_directory(app.static_folder, "index.html")

        @app.errorhandler(404)
        def send_unknown_to_index(_):
            return send_from_directory(app.static_folder, "index.html")

    return app


app = create_app()
