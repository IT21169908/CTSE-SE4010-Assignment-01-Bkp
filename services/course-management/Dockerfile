# Use Node.js base image
FROM node:20-alpine

LABEL authors="prashanth"

# Set working directory
WORKDIR /app/course-management

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port
EXPOSE 8002

# Command to run the service
CMD ["npm", "run", "start:prod"]
