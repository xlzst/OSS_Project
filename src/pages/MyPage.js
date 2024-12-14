import React, { useEffect, useState } from "react";
import "./main.css"; // 스타일 파일

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

 const handleEdit = async (mycourse) => {
    try {
      const method = 'PUT';
      const url = `https://675ae1579ce247eb1934ea3d.mockapi.io/course/course/${mycourse.id}`;
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
    <h2 className="page-title">Courses Wishist</h2>

      {/* 강의 목록 */}
      <div className="courses-grid">
        {mycourses.map((course, index) => (
          <div className="course-card" key={index}>
            <img
              src={course.course_image}
              alt={course.name}
              className="course-image"
            />
            <div className="course-details">
              <h2 className="course-title">{course.name}</h2>
              <p className="course-professor">
                <strong>Professor:</strong> {course.professor}
              </p>
            </div>
            <div className="course-actions">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-link"
              >
                Course Page
              </a>
              <button onClick={() => handleEdit(course)} className="edit">Edit</button>
              <button onClick={() => handleDelete(course.id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
);

}

export default MyPage;