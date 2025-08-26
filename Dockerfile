# Start with a multi-stage build to keep the final image small and secure.

# ---
# Build stage
# ---
# Use an official Node.js image with Alpine Linux for a small footprint.
FROM node:18-alpine AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache.
# This step is cached unless your package files change.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application source code.
COPY . .

# Run the build command to compile the TypeScript source files.
RUN npm run build

# ---
# Production stage
# ---
# Use a fresh, minimal Node.js image for the final production container.
FROM node:18-alpine AS production

# Set the working directory.
WORKDIR /app

# Copy only the essential files from the build stage to the production stage.
# This includes the compiled JavaScript files and package information.
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only the production dependencies. This skips dev dependencies
# and helps reduce the final image size.
RUN npm install --only=production

# Set environment variables for the application.
ENV NODE_ENV=production

# Expose the port the application runs on. This is documentation for
# the port, not a published port.
EXPOSE 3000

# Define the command to run the application when the container starts.
CMD ["node", "dist/main.js"]
