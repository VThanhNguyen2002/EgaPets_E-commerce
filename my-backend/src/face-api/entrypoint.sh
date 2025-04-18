#!/bin/bash
echo "Starting Gunicorn CPU mode..."
cd /app
gunicorn --bind 0.0.0.0:5000 wsgi:app -w 1 -k gthread

