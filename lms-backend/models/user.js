const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  enrolledCourses: [String],
});

module.exports = mongoose.model('User', userSchema);
