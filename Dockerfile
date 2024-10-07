FROM python:3.12-bullseye AS base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONHASHSEED random
ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PIP_DEFAULT_TIMEOUT 100
ENV POETRY_VERSION 1.8.3
ENV VERSION $VERSION
ARG PORT

FROM base AS dev

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

WORKDIR /backend

RUN poetry config virtualenvs.create true && \
    poetry config virtualenvs.in-project true

ENV VERSION $VERSION

ENTRYPOINT [ "/backend/docker-entrypoint.dev.sh" ]

FROM oven/bun:1.1-alpine AS build

WORKDIR /web

COPY ./ui/public/ ./public/
COPY ./ui/src/ ./src/
COPY ./ui/package.json ./ui/tsconfig.json ./ui/yarn.lock ./

RUN bun install && bun run build

FROM base AS prod

SHELL [ "/bin/bash", "-euxo", "pipefail", "-c" ]

RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

WORKDIR /tmp

COPY poetry.lock pyproject.toml ./

RUN poetry export --without-hashes -f requirements.txt | pip install --no-cache-dir -r /dev/stdin

WORKDIR /backend

COPY ./ncovenience/ ./ncovenience/
COPY ./phcovid/ ./phcovid/
COPY ./*.py ./
COPY ./*.sh ./
COPY hypercorn.toml .
COPY --from=build /web/dist ./ui/

RUN chmod +x docker-entrypoint.sh

EXPOSE $PORT

ENTRYPOINT [ "/backend/docker-entrypoint.sh" ]
