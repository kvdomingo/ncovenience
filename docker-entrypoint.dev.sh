#!/bin/bash

set -euxo pipefail

poetry install --no-root

exec poetry run quart run -p 8000 -h 0.0.0.0
