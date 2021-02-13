FROM ubuntu:latest

RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN apt-get install -y cron
WORKDIR /code
RUN mkdir /code/utils
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY scraper.py .
COPY get_companies_info.py .
COPY utils /code/utils
# Add cron files
COPY ./run.sh /run.sh
COPY ./scraper-entrypoint/cron_job.sh .
RUN chmod +x /run.sh ./cron_job.sh
ENTRYPOINT ["./cron_job.sh"]
