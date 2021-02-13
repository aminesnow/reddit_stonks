#!/bin/bash

echo "Running scraper.py"
python3 -u /code/scraper.py
echo "Finished running scraper.py"

echo "Running get_companies_info.py"
python3 -u /code/get_companies_info.py
echo "Finished running get_companies_info.py"
