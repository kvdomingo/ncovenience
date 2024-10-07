import json

from quart import Blueprint

from . import data, serialize, utils

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/cases")
async def cases():
    ph_conf = utils.df_to_geojson(data.get_phcovid())
    ph_json = json.loads(ph_conf)
    return ph_json


@api.route("/numbers")
async def numbers():
    number = data.get_ph_numbers()
    return number


@api.route("counts")
async def delta_counts():
    counts = data.get_ph_numbers_delta()
    return counts


@api.route("time-plot")
async def time_plot():
    datasets = serialize.get_plot_over_time()
    return {"datasets": datasets}


@api.route("delta-plot")
async def delta_plot():
    datasets = serialize.get_delta_over_time()
    return {"datasets": datasets}


@api.route("world-plot")
async def world_plot():
    datasets = serialize.get_world_over_time()
    return {"datasets": datasets}


@api.route("age-plot")
async def age_plot():
    datasets = serialize.get_plot_by_age()
    return {"datasets": datasets}


@api.route("metro-plot")
async def metro_plot():
    datasets = serialize.get_metro_cases()
    return {"datasets": datasets}
