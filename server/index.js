const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ Response: 'Server is running.' }).status(200);
});

app.listen(PORT, () => {
  console.log('Backend Server Running');
});
