# Build stage
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
RUN apk add --no-cache bash \
    && if [ "$NODE_ENV" = "development" ]; \
    then npm install --force; \
    else npm install --only=production --force; \
    fi
COPY . .
RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

# Production stage
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM build-stage AS development-stage
CMD ["sh", "-c", "npm run serve"]
