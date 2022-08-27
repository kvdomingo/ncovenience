from datetime import datetime

import geojson
import pandas as pd

from ...cache import cache
from . import data


class GeoJSONNATEncoder(geojson.GeoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, type(pd.NaT)):
            return None
        elif obj.__class__.__name__ == "Timestamp":
            return str(obj)
        return super().default(obj)


def check_last_updated():
    last_updated = cache.get("last_updated")
    confirmed = data.get_confirmed_over_time()
    today_count = data.get_ph_numbers()["confirmed"]
    stored_count = cache.get("confirmed")
    if last_updated is None:
        ph_time = confirmed.query("`Country/Region` == 'Philippines'")
        ph_time = ph_time[ph_time.columns[4:]]
        time = ph_time.columns
        last_updated = datetime.now()
    else:
        if today_count != stored_count:
            last_updated = datetime.now()
    return last_updated.strftime("%H:%M, %d %b %Y")


def df_to_geojson(df: pd.DataFrame, **kwargs):
    features = []

    def insert_features(row):
        try:
            features.append(
                geojson.Feature(
                    geometry=geojson.Point(
                        (
                            float(row["coordinates"]["lng"]),
                            float(row["coordinates"]["lat"]),
                            0.0,
                        )
                    ),
                    properties=row.to_dict(),
                )
            )
        except KeyError:
            try:
                features.append(
                    geojson.Feature(
                        geometry=geojson.Point(
                            (
                                float(row["longitude"]),
                                float(row["latitude"]),
                                0.0,
                            )
                        ),
                        properties=row.to_dict(),
                    )
                )
            except ValueError:
                features.append(
                    geojson.Feature(
                        geometry=None,
                        properties=row.to_dict(),
                    )
                )

    df.apply(insert_features, axis=1)
    return geojson.dumps(geojson.FeatureCollection(features, separators=(",", ":")), cls=GeoJSONNATEncoder, **kwargs)


def date_to_datetime(df):
    for d in df.columns[4:]:
        df = df.rename(columns={d: datetime.strptime(d, "%m/%d/%y")})
    return df


def count_latest(df):
    df_unique = df.groupby("Country/Region").sum()
    total = df_unique[df_unique.keys()[-1]][df_unique.index.tolist().index("Philippines")]
    return total
