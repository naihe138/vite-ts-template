FROM node:18-alpine as build-stage

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN npm i -g pnpm@8 --force
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production-stage
WORKDIR /usr/src/app
COPY --from=build-stage /app/dist /usr/src/app
COPY --from=build-stage /app/devops/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
