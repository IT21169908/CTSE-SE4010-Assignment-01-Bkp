# Use Node.js base image
FROM node

LABEL authors="hansa"

# Set working directory
WORKDIR /app/auth

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port
EXPOSE 8001

# Command to run the service
CMD ["npm", "run", "start:prod"]