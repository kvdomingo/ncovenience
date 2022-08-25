import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ncovenience.settings")

import django

django.setup()

from time import perf_counter

from django.conf import settings

from phcovid.phcovid import get_cases


def main():
    print("Getting latest COVID-19PH data...")
    t0 = perf_counter()
    df = get_cases()
    df = df.fillna("")
    t1 = perf_counter()
    print(f"Done in {(t1 - t0)/60} minutes")
    with open(settings.BASE_DIR / "ncovenience" / "data" / "latest.json", "w") as f:
        df.to_json(f, indent=4, orient="index")


if __name__ == "__main__":
    main()
