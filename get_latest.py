from time import perf_counter

from numpy import nan
from pandas import NaT

from ncovenience.config import BASE_DIR
from ncovenience.log import logger
from phcovid.phcovid import get_cases


def main():
    logger.info("Getting latest COVID-19PH data...")
    t0 = perf_counter()
    df = get_cases()
    df = df.fillna("").replace(nan, "").replace(NaT, "")
    t1 = perf_counter()
    diff = (t1 - t0) / 60
    logger.info(f"Done in {diff} minutes")
    with open(BASE_DIR / "ncovenience" / "data" / "latest.json", "w+") as f:
        df.to_json(f, indent=4, orient="index")


if __name__ == "__main__":
    main()
