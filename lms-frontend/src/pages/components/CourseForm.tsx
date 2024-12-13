// CourseForm.tsx
import React, { useState } from 'react';

// Define the types for the props.
type CourseFormProps = {
  onSubmit: (course: { title: string; description: string; duration: string; instructor: string }) => void;
};

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={course.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={course.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="instructor">Instructor</label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          value={course.instructor}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
