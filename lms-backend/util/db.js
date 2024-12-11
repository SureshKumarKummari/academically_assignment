const mongoose = require('mongoose');

mongoose.connect('your-mongo-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
