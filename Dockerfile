FROM node:14.10.1

COPY .yarn /root/app/.yarn
COPY package.json yarn.lock .yarnrc.yml run-in-docker.sh *.js /root/app/

WORKDIR /root/app

ENTRYPOINT ["/root/app/run-in-docker.sh"]
