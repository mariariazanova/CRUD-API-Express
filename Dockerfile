# Use a smaller Alpine-based Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies efficiently
COPY package.json package-lock.json ./
RUN npm ci # --omit=dev  # Install only production dependencies

# Copy application source code
COPY . .

# Build application
RUN npm run build

# Expose the application port
#EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]