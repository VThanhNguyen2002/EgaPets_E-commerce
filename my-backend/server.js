const app  = require('./src/app');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Main API ready at http://${HOST}:${PORT}`);
  console.log(`✅ Server is listening on all interfaces (${HOST}:${PORT})`);
});
