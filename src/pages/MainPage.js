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
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 30; // 페이지당 항목 수
  const navigate = useNavigate();
  

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Initialize XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = "https://apis.data.go.kr/B552881/kmooc_v2_0/courseList_v2_0";
    const key = process.env.REACT_APP_API_KEY;
    const size = "500";
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
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [filter, courses]);

const handleSearch = () => {
navigate("/search", { state: { searchType, searchTerm, courses } });
};

const handleAddWish = async (course) => {
    try {
      const method = 'POST';
      const url = `https://675ae1579ce247eb1934ea3d.mockapi.io/course/course`;
      
      // Step 1: Fetch the current wishlist to check for duplicates
      const wishlistResponse = await fetch(url, { method: 'GET' });
      const wishlist = await wishlistResponse.json();
  
      // Step 2: Check if the course is already in the wishlist
      const isAlreadyInWishlist = wishlist.some((item) => item.name === course.name);
  
      if (isAlreadyInWishlist) {
        alert("This course is already in your wishlist.");
        return; // Stop further execution if duplicate is found
      }
  
      // Step 3: Add the `memo` dynamically and proceed with adding the course
      addDynamicKey(course, "memo", ""); // Add the memo key with an empty value
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
  
      alert("Course was added to wishlist.");
    } catch (error) {
      console.error('Error saving Courses:', error);
    }
  };
  
  const addDynamicKey = (obj, key, value) => {
    obj[key] = value;
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-5">
    <h2 className="page-title">Courses List</h2>
    <div className="toolbar">
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
        {currentItems.map((course, index) => (
          <div className="course-card" key={index}>
            <img
              src={course.course_image}
              alt={course.name}
              className="course-image"
              onClick={() => navigate(`/detail/${course.id}`)}
            />
            <div className="course-details">
              <h2 className="course-title">{course.name}</h2>
              <p className="course-professor">
                <strong>Professor:</strong> {course.professor}
              </p>
              <p className="course-organization">
                <strong>Organization:</strong> {course.org_name}
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
              <button onClick={() => handleAddWish(course)} className="add-wish">
                Add To WishList
                </button>
            </div>
          </div>
        ))}
      </div>

{/* 페이지네이션 */}
<div className="pagination">
<button
    className="pagination-button"
    onClick={() => { setCurrentPage((prev) => {
        const newPage = Math.max(prev - 1, 1);
        if (newPage !== prev) window.scrollTo({ top: 0, behavior: "smooth" });
        return newPage;});
    }}
    disabled={currentPage === 1}> Previous </button>
    <span className="pagination-info">
    {currentPage} of {totalPages}</span>
    <button
    className="pagination-button"
    onClick={() => setCurrentPage((prev) => {
        const newPage = Math.min(prev + 1, totalPages);
        if (newPage !== prev) window.scrollTo({ top: 0, behavior: "smooth" });
        return newPage;})}
    disabled={currentPage === totalPages}> Next </button>
</div>

    </div>
);
};

export default MainPage;