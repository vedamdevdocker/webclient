# Use official Node.js image with v16 as the builder stage
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leveage Docker cache
COPY my-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY my-app/ ./

# Build the React app
RUN npm run build

# Use official Nginx image for serving the app
FROM nginx:alpine

# Set working directory
WORKDIR /etc/nginx

# Copy SSL certificates
COPY ./certs/webclient/server.crt /etc/ssl/certs/webclient.crt
COPY ./certs/webclient/server.key /etc/ssl/private/webclient.key

COPY ./certs/appservice/server.crt /etc/ssl/certs/appservice.crt

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/

RUN chmod 644 /etc/ssl/certs/webclient.crt

# Copy the build folder from the builder image to Nginx's serving directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose HTTPS port
EXPOSE 52516

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
