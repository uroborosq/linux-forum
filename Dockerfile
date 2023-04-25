FROM node:18 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ./public/package.json ./public/
COPY ./public/package-lock.json ./public/.
ENV PATH "/app/node_modules/.bin/:$PATH"

RUN npm install

COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:18 as launch
WORKDIR /app
ENV PATH "/app/node_modules/.bin/:$PATH"
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
EXPOSE 3000
ENTRYPOINT [ "node", "dist/main.js"]
