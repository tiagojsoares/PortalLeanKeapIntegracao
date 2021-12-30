FROM node:16-alpine
ENV NODE_ENV=production
# WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent && mv node_modules ../
RUN export NODE_OPTIONS=--max-old-space-size=8192
COPY . .
EXPOSE 3000
# RUN chown -R node /usr/src/app

CMD ["node", "index.js"]
