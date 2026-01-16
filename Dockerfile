# Use Node 20 (LTS) directly
FROM node:20-slim

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (npm is already up to date here)
RUN npm install

# Copy the rest of your app
COPY . .

CMD ["node", "index.js"]