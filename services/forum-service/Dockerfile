# Use Node.js base image
FROM node

LABEL authors="hasitha"

# Set working directory
WORKDIR /app/forum-service

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port
EXPOSE 8003

# Command to run the service
CMD ["npm", "start"]