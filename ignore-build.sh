#!/bin/bash

echo "<<<<<<<<<<<<<<<<<<<<<<<<<"

pnpm -v
env

echo ">>>>>>>>>>>>>>>>>>>>>>>>>"

echo $(pnpm -v)
echo $(env)

echo "========================="

exit 1
