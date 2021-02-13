#!/bin/bash

echo 'started db backup'

dump=$1

docker-compose -f $2 exec -T stonks-db sh -c 'mongodump --archive -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DB' > ${dump}


echo 'db backup done'