import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css"; // 스타일 파일

const MyPage = () => {
  const [mycourses, setMyCourses] = useState([]); // Store parsed JSON data
  const [searchType, setSearchType] = useState("name"); // 검색 유형 (name or professor)
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터링된 데이터
  const [filter, setFilter] = useState("all"); // 필터 타입
  const navigate = useNavigate();

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

useEffect(() => {
if (filter === "all") {
    setFilteredCourses(mycourses); // 전체 데이터를 표시
} else {
    setFilteredCourses(
    mycourses.filter((course) =>
        course.name.toLowerCase().includes(filter.toLowerCase())
    )
    );
}
}, [filter, mycourses]);

const handleSearch = () => {
navigate("/search", { state: { searchType, searchTerm, mycourses } });
};

return (
    <div className="container mt-5">
    <h2 className="page-title">Courses Wishist</h2>

      {/* 필터 및 검색창 */}
      <div className="toolbar">
        {/* 필터 */}
        <div className="filter-bar">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">전체</option>
            <option value="(수어)">수어</option>
            <option value="(mooc)">mooc</option>
            <option value="(더빙)">더빙</option>
            <option value="(방송)">방송</option>
          </select>
        </div>

        {/* 검색 */}
        <div className="search-bar">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="name">Search by Title</option>
            <option value="professor">Search by Professor</option>
          </select>
          <input
            type="text"
            placeholder="Enter your search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      {/* 강의 목록 */}
      <div className="courses-grid">
        {filteredCourses.map((course, index) => (
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