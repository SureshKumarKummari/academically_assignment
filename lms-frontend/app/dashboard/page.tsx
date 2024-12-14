"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", duration: "", instructor: "" });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [updatedCourse, setUpdatedCourse] = useState({ title: "", description: "", duration: "", instructor: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      fetchCourses();
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(newCourse),
        headers: { "Content-Type": "application/json" },
      });
      const addedCourse = await response.json();
      setCourses([...courses, addedCourse]);
      setNewCourse({ title: "", description: "", duration: "", instructor: "" });
      setIsFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleEditCourse = (courseId: string) => {
    const course = courses.find((course) => course._id === courseId);
    if (course) {
      setUpdatedCourse({
        title: course.title,
        description: course.description,
        duration: course.duration,
        instructor: course.instructor,
      });
      setEditingCourseId(courseId);
    }
  };

  const handleUpdateCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(updatedCourse),
        headers: { "Content-Type": "application/json" },
      });

      const updated = await response.json();
      const updatedCourses = courses.map((course) =>
        course._id === courseId ? updated : course
      );
      setCourses(updatedCourses);
      setEditingCourseId(null);
      setUpdatedCourse({ title: "", description: "", duration: "", instructor: "" });
    } catch (error) {
      console.log("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (user) {
      try {
        const response = await fetch(`/api/users/enroll/${courseId}`, {
          method: "POST",
          body: JSON.stringify({ userId: user.userId }),
          headers: { "Content-Type": "application/json" },
        });
        const enrolledUser = await response.json();
        setUser(enrolledUser);
      } catch (error) {
        console.error("Error enrolling in course:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {user?.isadmin ? (
        // Admin View
        <div>
          <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

          <button
            style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
            onClick={() => setIsFormVisible(true)}
          >
            Add New Course
          </button>

          {isFormVisible && (
            <div style={{ marginBottom: "20px" }}>
              <input
                style={{ margin: "5px", padding: "8px", width: "200px" }}
                type="text"
                name="title"
                placeholder="Title"
                value={newCourse.title}
                onChange={handleInputChange}
              />
              <input
                style={{ margin: "5px", padding: "8px", width: "200px" }}
                type="text"
                name="description"
                placeholder="Description"
                value={newCourse.description}
                onChange={handleInputChange}
              />
              <input
                style={{ margin: "5px", padding: "8px", width: "200px" }}
                type="text"
                name="duration"
                placeholder="Duration"
                value={newCourse.duration}
                onChange={handleInputChange}
              />
              <input
                style={{ margin: "5px", padding: "8px", width: "200px" }}
                type="text"
                name="instructor"
                placeholder="Instructor"
                value={newCourse.instructor}
                onChange={handleInputChange}
              />
              <button
                style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                onClick={handleAddCourse}
              >
                Save New Course
              </button>
            </div>
          )}

          <h2 style={{ textAlign: "center" }}>Courses List</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Duration</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Instructor</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  {editingCourseId === course._id ? (
                    <>
                      <td>
                        <input
                          style={{ padding: "8px", width: "100%" }}
                          value={updatedCourse.title}
                          onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          style={{ padding: "8px", width: "100%" }}
                          value={updatedCourse.description}
                          onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          style={{ padding: "8px", width: "100%" }}
                          value={updatedCourse.duration}
                          onChange={(e) => setUpdatedCourse({ ...updatedCourse, duration: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          style={{ padding: "8px", width: "100%" }}
                          value={updatedCourse.instructor}
                          onChange={(e) => setUpdatedCourse({ ...updatedCourse, instructor: e.target.value })}
                        />
                      </td>
                      <td>
                        <button
                          style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                          onClick={() => handleUpdateCourse(course._id)}
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{course.title}</td>
                      <td>{course.description}</td>
                      <td>{course.duration}</td>
                      <td>{course.instructor}</td>
                      <td>
                        <button
                          style={{ padding: "8px", backgroundColor: "#FF6347", color: "white", border: "none", cursor: "pointer" }}
                          onClick={() => handleEditCourse(course._id)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ padding: "8px", backgroundColor: "#FF6347", color: "white", border: "none", cursor: "pointer" }}
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // User View
        <div>
          <h1 style={{ textAlign: "center" }}>User Dashboard</h1>

          <h2>Enrolled Courses</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Duration</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Instructor</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user && user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                user.enrolledCourses.map((courseId: string) => {
                  const course = courses.find((course) => course._id === courseId);
                  return (
                    course && (
                      <tr key={course._id}>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>{course.duration}</td>
                        <td>{course.instructor}</td>
                        <td>
                          <button
                            style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                            onClick={() => handleEnroll(course._id)}
                          >
                            Enroll in another course
                          </button>
                        </td>
                      </tr>
                    )
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No enrolled courses found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2>Browse Available Courses</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Description</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Duration</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Instructor</th>
                <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.duration}</td>
                  <td>{course.instructor}</td>
                  <td>
                    <button
                      style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                      onClick={() => handleEnroll(course._id)}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
