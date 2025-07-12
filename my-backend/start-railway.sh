#!/bin/sh

# Railway startup script
echo "🚀 Starting EgaPets on Railway..."

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
exec npm start