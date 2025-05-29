# server/Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variable for production mode if needed
ENV NODE_ENV=production

EXPOSE 5000
CMD ["node", "index.js"]