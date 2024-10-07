#!/bin/bash

set -euxo pipefail

exec poetry run hypercorn --config hypercorn.toml
