#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd food_delivery/food-frontend
npm install

echo "Building frontend application..."
npm run build

echo "Frontend build complete!"
