from json import loads

from flask import Blueprint

from . import data, serialize, utils

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/cases")
def cases():
    ph_conf = utils.df_to_geojson(data.get_phcovid())
    ph_json = loads(ph_conf)
    return ph_json


@api.route("/numbers")
def numbers():
    number = data.get_ph_numbers()
    return number


@api.route("counts")
def delta_counts():
    counts = data.get_ph_numbers_delta()
    return counts


@api.route("time-plot")
def time_plot():
    datasets = serialize.get_plot_over_time()
    return dict(datasets=datasets)


@api.route("delta-plot")
def delta_plot():
    datasets = serialize.get_delta_over_time()
    return dict(datasets=datasets)


@api.route("world-plot")
def world_plot():
    datasets = serialize.get_world_over_time()
    return dict(datasets=datasets)


@api.route("age-plot")
def age_plot():
    datasets = serialize.get_plot_by_age()
    return dict(datasets=datasets)


@api.route("metro-plot")
def metro_plot():
    datasets = serialize.get_metro_cases()
    return dict(datasets=datasets)
