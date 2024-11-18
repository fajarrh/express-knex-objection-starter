#!/bin/bash

# Define variables
IMAGE_NAME="api-app"
IMAGE_TAG="latest" # Change this to your desired tag

# Build the Docker image
echo "Building Docker image..."
docker build . -t "$IMAGE_NAME:$IMAGE_TAG"

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Docker image $IMAGE_NAME:$IMAGE_TAG built successfully!"
else
  echo "Failed to build Docker image."
  exit 1
fi
