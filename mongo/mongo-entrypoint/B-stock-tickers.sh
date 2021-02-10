#!/bin/sh

mongoimport /seed/yahoo_tickers.json -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DB --collection yh_tickers --jsonArray