# alpine build for smaller image size https://hub.docker.com/_/node/
FROM node:15.8.0 AS app-builder

#RUN mv /usr/local/lib/node_modules /usr/local/lib/node_modules.tmp \
#    && mv /usr/local/lib/node_modules.tmp /usr/local/lib/node_modules \
#   && npm i -g npm@latest

# We want to use the lastest npm for security updates and speed
RUN npm i -g npm@latest

WORKDIR /home/node/app

#RUN apk add --no-cache --virtual .gyp python3 make g++

#RUN chown -R node:node /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build:local

# trivy scans our image for vulnerabilities
# by default it exits with 0 even if vulnerabilities are found
# optional add "--exit-code 1"
# RUN apt-get install curl \
#   && curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/master/contrib/install.sh | sh -s -- -b /usr/local/bin \
#   && trivy filesystem --no-progress /

FROM nginx:1.19.6-alpine AS app

WORKDIR /home/node/app
STOPSIGNAL SIGTERM
EXPOSE 3000

COPY --chown=nginx:nginx ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=app-builder /home/node/app/build /usr/share/nginx/html
COPY --chown=nginx:nginx docker-entrypoint.sh /docker-entrypoint.d/30-env-variables.sh

# the official nginx image provides an unprivileged user as a security best practice
# but we have to manually enable it.
USER nginx

# Uses CMD from nginx image