# ============================================
# Multi-stage build for optimized production
# ============================================

# Dependencies stage - Install and cache dependencies
FROM node:18-alpine AS dependencies

# Install security updates and required packages
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files for better Docker layer caching
COPY package*.json ./

# Install all dependencies (dev + prod for potential build steps)
RUN npm ci --include=dev && \
    npm cache clean --force

# Production dependencies stage - Only production deps
FROM node:18-alpine AS prod-dependencies

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Production stage - Final optimized image
FROM node:18-alpine AS production

# Install security updates and minimal required packages
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init curl tini && \
    rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

WORKDIR /app

# Copy production dependencies
COPY --from=prod-dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Copy application source code
COPY --chown=nodejs:nodejs src/ ./src/
COPY --chown=nodejs:nodejs server.js ./

# Create necessary directories with proper permissions
RUN mkdir -p /app/logs /app/uploads /app/temp && \
    chown -R nodejs:nodejs /app && \
    chmod -R 755 /app

# Set environment variables
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PROGRESS=false

# Switch to non-root user for security
USER nodejs

# Enhanced health check with better error handling
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Expose port
EXPOSE 5000

# Add labels for better container management
LABEL maintainer="EgaPet Team" \
      version="1.0.0" \
      description="EgaPet Backend API" \
      org.opencontainers.image.source="https://github.com/egapet/backend"

# Use tini as init system for proper signal handling
ENTRYPOINT ["tini", "--"]

# Start application with proper signal handling
CMD ["node", "-r", "module-alias/register", "server.js"]
