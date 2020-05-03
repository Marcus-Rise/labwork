#!/usr/bin/env bash

export DOCKER_BUILDKIT=1

docker build -t labwork -o out .
