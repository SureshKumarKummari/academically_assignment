const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Enroll in a course
router.post('/users/enroll/:courseId', async (req, res) => {
  const { userId } = req.body;
  const { courseId } = req.params;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  user.enrolledCourses.push(courseId);
  await user.save();
  res.status(200).send(user);
});

module.exports = router;
