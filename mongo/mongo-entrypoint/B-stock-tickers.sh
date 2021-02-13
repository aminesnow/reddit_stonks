#!/bin/sh

SEED=/seed/yahoo_tickers.json

if [ -f "$SEED" ]; then
    mongoimport $SEED -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DB --collection yh_tickers --jsonArray
else
    echo "No seed found"
fi