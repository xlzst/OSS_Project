import React, { useEffect, useState } from "react";
import "./main.css"; // 스타일 파일
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [courses, setCourses] = useState([]); // Store parsed JSON data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [searchType, setSearchType] = useState("name"); // 검색 유형 (name or professor)
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터링된 데이터
  const [filter, setFilter] = useState("all"); // 필터 타입
  const navigate = useNavigate();
  

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Initialize XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = "http://apis.data.go.kr/B552881/kmooc_v2_0/courseList_v2_0";
    const key = "Sl7VyA9lMCV9eyR8NoauVEgi9ZlK68K2gQU5H4vRdsIP%2BClSh%2FqTR0fMxgxzx7k7FIY%2Bc17ZXAciJMrpILejew%3D%3D";
    const size = "100";
    const queryParams =
      "?" + encodeURIComponent("serviceKey") + "=" + key + "&Size=" + size;

    xhr.open("GET", url + queryParams);

    // Define the callback
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const responseJSON = JSON.parse(xhr.responseText); // JSON 데이터를 파싱
            setCourses(responseJSON.items || []);
          } catch (e) {
            setError("Failed to parse JSON response.");
          }
        } else {
          setError(`Failed to load data. Status code: ${xhr.status}`);
        }
        setLoading(false);
      }
    };

    xhr.onerror = function () {
      setError("An error occurred while making the request.");
      setLoading(false);
    };

    // Send the request
    xhr.send();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(courses); // 전체 데이터를 표시
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, courses]);

  const handleSearch = () => {
    navigate("/search", { state: { searchType, searchTerm, courses } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-5">
    <h2 className="page-title">Courses List</h2>

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
            <option value="name">Title</option>
            <option value="professor">Professor</option>
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
              <button className="add-wish">Add To WishList</button>
            </div>
          </div>
        ))}
      </div>
    </div>
);
};

export default MainPage;