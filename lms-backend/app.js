const express = require('express');
const mongoose = require('./util/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose();
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');

app.use(courseRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
