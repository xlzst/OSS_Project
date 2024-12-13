import React, { useEffect, useState } from "react";

const TestJSON = () => {
  const [courses, setCourses] = useState([]); // Store parsed JSON data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(false); // Loading state

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Initialize XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = "http://apis.data.go.kr/B552881/kmooc_v2_0/courseList_v2_0";
    const key = "Sl7VyA9lMCV9eyR8NoauVEgi9ZlK68K2gQU5H4vRdsIP%2BClSh%2FqTR0fMxgxzx7k7FIY%2Bc17ZXAciJMrpILejew%3D%3D";
    const queryParams =
      "?" + encodeURIComponent("serviceKey") + "=" + key;

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="page-title">Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default TestJSON;