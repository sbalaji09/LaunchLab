FROM node:14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the nested launch-lab folder
COPY frontend/launch-lab/package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the nested launch-lab folder
COPY frontend/launch-lab/. .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]