# Use a more recent Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the new port that the application will run on
EXPOSE 58099

# Set the PORT environment variable
ENV PORT=58099

# Start the application
CMD ["npm", "start"]
