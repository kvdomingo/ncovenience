FROM node:16-alpine as build

WORKDIR /web/app

COPY ./web/app/ ./

RUN npm install

RUN npm run build

FROM python:3.9.7-alpine as prod

RUN apk add g++ jpeg-dev zlib-dev libjpeg make

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /backend

COPY ./backend/ ./backend/
COPY ./ncovenience/ ./ncovenience/
COPY ./phcovid/ ./phcovid/
COPY ./*.py ./
COPY ./*.sh ./
COPY --from=build /web/app/build/ ./web/app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
