# Stage 1: Build with Vite
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY vite.config.* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (Vite outputs to dist/)
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy the Vite build output (dist) to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
