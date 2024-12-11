const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Add a new course
router.post('/admin/courses', async (req, res) => {
  const { title, description, duration, instructor } = req.body;
  const newCourse = new Course({ title, description, duration, instructor });
  await newCourse.save();
  res.status(201).send(newCourse);
});

// Get all courses
router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
});

// Update a course
router.put('/admin/courses/:id', async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(updatedCourse);
});

// Delete a course
router.delete('/admin/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: 'Course deleted' });
});

module.exports = router;
