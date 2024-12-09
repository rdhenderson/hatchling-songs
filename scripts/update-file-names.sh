#!/bin/bash

FILE="file name"
touch "$FILE"
mv -v "$FILE" "${FILE// /_/}"
