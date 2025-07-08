// Vercel API handler for backend routes
const { createServer } = require('http');
const app = require('../my-backend/src/app');

// Create HTTP server with Express app
const server = createServer(app);

module.exports = (req, res) => {
  // Handle the request with Express app
  return app(req, res);
};