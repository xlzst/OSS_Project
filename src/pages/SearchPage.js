import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./main.css"; // 스타일 파일

const SearchPage = () => {
  const location = useLocation();
  const { searchType, searchTerm, courses } = location.state;
  const navigate = useNavigate();

  // 필터링된 결과
  const filteredCourses = courses.filter((course) =>
    searchType === "name"
      ? course.name.toLowerCase().includes(searchTerm.toLowerCase())
      : course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // 한 페이지에 표시할 항목 수

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="page-title">Search Results</h2>

      {filteredCourses.length > 0 ? (
        <>
          <div className="courses-grid">
            {currentItems.map((course, index) => (
              <div className="course-card" key={index}>
                <img
                  src={course.course_image}
                  alt={course.name}
                  className="course-image"
                  onClick={() => navigate(`/detail/${course.id}`)}
                />
                <div className="course-details">
                  <h3 className="course-title">{course.name}</h3>
                  <p className="course-professor">
                    <strong>Professor:</strong> {course.professor}
                  </p>
                  <p className="course-enrollment">
                <strong>Enrollment Period:</strong>{" "}
                {new Date(course.enrollment_start * 1000).toLocaleDateString()}{" "}
                  - {new Date(course.enrollment_end * 1000).toLocaleDateString()}
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

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => {
                setCurrentPage((prev) => {
                  const newPage = Math.max(prev - 1, 1);
                  if (newPage !== prev) window.scrollTo({ top: 0, behavior: "smooth" });
                  return newPage;
                });
              }}
              disabled={currentPage === 1} // 첫 페이지에서는 비활성화
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => {
                setCurrentPage((prev) => {
                  const newPage = Math.min(prev + 1, totalPages);
                  if (newPage !== prev) window.scrollTo({ top: 0, behavior: "smooth" });
                  return newPage;
                });
              }}
              disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;