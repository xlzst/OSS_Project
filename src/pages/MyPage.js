import React, { useEffect, useState } from "react";

const MyPage = () => {
  const [mycourses, setMyCourses] = useState([]); // Store parsed JSON data

  const fetchMyCourses = async () => {
    try {
      const response = await fetch('https://675ae1579ce247eb1934ea3d.mockapi.io/course/course');
      const data = await response.json();
      setMyCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

 const handleAddOrEdit = async (mycourse) => {
    try {
      const method = mycourse.id ? 'PUT' : 'POST';
      const url = mycourse.id
        ? `https://675ae1579ce247eb1934ea3d.mockapi.io/course/course/${mycourse.id}`
        : 'https://675ae1579ce247eb1934ea3d.mockapi.io/course/course';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mycourse),
      });
      fetchMyCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

 const handleDelete = async (id) => {
    try {
      await fetch(`https://675ae1579ce247eb1934ea3d.mockapi.io/course/course/${id}`, { method: 'DELETE' });
      fetchMyCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="page-title">Courses</h2>
      {mycourses.length > 0 ? (
        <ul>
          {mycourses.map((course, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h3>{course.name}</h3>
              <img
                src={course.course_image}
                alt={course.name}
                style={{ maxWidth: "200px", marginBottom: "10px" }}
              />
              <p><strong>Professor:</strong> {course.professor}</p>
              <p><strong>Enrollment Period:</strong> {new Date(course.enrollment_start * 1000).toLocaleDateString()} - {new Date(course.enrollment_end * 1000).toLocaleDateString()}</p>
              <a href={course.url} target="_blank" rel="noopener noreferrer">
                View Course
              </a>
              <button onClick={() => handleDelete(course.id)}>Delete</button>
              <button onClick={() => handleAddOrEdit(course)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses were found.</p>
      )}
    </div>
  )

}

export default MyPage;