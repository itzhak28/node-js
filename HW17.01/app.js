const express = require('express');
const tvRouter = require('./router')
const app = express();
const port = 3001;

app.use('/tvs', tvRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
