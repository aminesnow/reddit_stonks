#!/bin/bash

echo "Docker container has been started"

declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

# Setup a cron schedule
echo "SHELL=/bin/bash
BASH_ENV=/container.env
0 */2 * * * /run.sh >> /var/log/cron.log 2>&1" > scheduler.txt

crontab scheduler.txt
cron -f