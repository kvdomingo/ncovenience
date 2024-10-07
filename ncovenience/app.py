import os.path

from quart import Quart, send_from_directory

from ncovenience.blueprints import api
from ncovenience.cache import cache
from ncovenience.config import BASE_DIR, PYTHON_ENV, SECRET_KEY


def create_app():
    app = Quart(__name__, static_url_path="/", static_folder=BASE_DIR / "ui")
    app.config.from_mapping(DEBUG=PYTHON_ENV != "production", SECRET_KEY=SECRET_KEY)
    app.register_blueprint(api)
    cache.init_app(app)

    if PYTHON_ENV == "production":

        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        async def serve(path: str):
            if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
                return await send_from_directory(app.static_folder, path)
            return await send_from_directory(app.static_folder, "index.html")

        @app.errorhandler(404)
        async def send_unknown_to_index(_):
            return await send_from_directory(app.static_folder, "index.html")

    return app


app = create_app()
