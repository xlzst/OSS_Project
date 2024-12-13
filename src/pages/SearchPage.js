import React from "react";
import { useLocation } from "react-router-dom";
import "./main.css"; // 스타일 파일

const SearchPage = () => {
  const location = useLocation();
  const { searchType, searchTerm, courses } = location.state;

  // 필터링된 결과
  const filteredCourses = courses.filter((course) =>
    searchType === "name"
      ? course.name.toLowerCase().includes(searchTerm.toLowerCase())
      : course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="page-title">Search Results</h2>

      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div className="course-card" key={index}>
              <img
                src={course.course_image}
                alt={course.name}
                className="course-image"
              />
              <div className="course-details">
                <h3 className="course-title">{course.name}</h3>
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
              <button className="add-wish">Add To WishList</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;