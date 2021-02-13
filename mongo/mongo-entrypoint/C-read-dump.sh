#!/bin/bash

DUMP=/dump/latest.dump

if [ -f "$DUMP" ]; then
    mongorestore -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DB --archive=$DUMP
else
    echo "No dump found"
fi