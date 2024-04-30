FROM node
WORKDIR /reveal/front
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=critical

FROM reveal-core

FROM node
COPY --from=0 /reveal/front/node_modules /reveal/front/node_modules
COPY --from=1 /reveal/reveal-core /reveal/core

WORKDIR /reveal/front
COPY . .
RUN npm run build
CMD npm run start
