#!/bin/sh

# Railway startup script
echo "🚀 Starting EgaPets on Railway..."
echo "📋 Environment Info:"
echo "   - NODE_ENV: $NODE_ENV"
echo "   - PORT: $PORT"
echo "   - DB_HOST: $DB_HOST"
echo "   - DB_PORT: $DB_PORT"
echo "   - DB_NAME: $DB_NAME"
echo "   - DB_SSL: $DB_SSL"

# Check required environment variables
if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ]; then
    echo "❌ Missing required database environment variables!"
    echo "   Required: DB_HOST, DB_USER, DB_PASSWORD"
    exit 1
fi

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
sleep 5

# Setup database if needed
echo "🔧 Setting up database..."
node scripts/setup-railway-db.js

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed"
else
    echo "⚠️ Database setup had issues, but continuing..."
fi

# Start the application
echo "🎯 Starting application server..."
echo "📡 Server will listen on 0.0.0.0:$PORT"
exec npm start