# Use an official Node runtime as the base image
FROM node:20-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy all the files
COPY . .

# Install the dependencies
RUN npm ci

# Build the application
RUN npm run build

# Add ARG instruction for build-time variable without a default value
ARG PORT
ARG DATABASE_URL

# Set environment variables
ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL

# Expose the port the app runs on
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "start-merchant-app"]