FROM node:8.12.0


ADD src /root/app/src
ADD test /root/app/test
COPY package.json yarn.lock run-in-docker.sh /root/app/

WORKDIR /root/app

RUN yarn config set yarn-offline-mirror /root/.yarn-offline
RUN yarn install --frozen-lockfile


ENTRYPOINT ["/root/app/run-in-docker.sh"]
