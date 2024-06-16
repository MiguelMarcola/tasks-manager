const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes');

const run = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(taskRoutes);

  const PORT = process.env.PORT || 8085;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
};

module.exports = { run };
