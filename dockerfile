# ============================================
# Stage 1: Build
# ============================================
FROM node:22-alpine AS build-stage

# Set working directory
WORKDIR /app

# Define build arguments for Vite environment variables
ARG VITE_BASE_URL=/
ARG VITE_API_AUTH
ARG VITE_STORAGE_KEY

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies using npm ci for faster, reproducible builds
RUN npm ci --prefer-offline --no-audit

# Copy application source code
COPY . .

# Set environment variables for build
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_API_AUTH=${VITE_API_AUTH}
ENV VITE_STORAGE_KEY=${VITE_STORAGE_KEY}

# Build the application
RUN npm run build

# ============================================
# Stage 2: Production (Nginx)
# ============================================
FROM nginx:alpine AS production-stage

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
