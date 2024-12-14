import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";

const CourseDetail = () => {
  const [course, setCourse] = useState(null); // Course 데이터를 저장
  const [error, setError] = useState(null); // 에러 메시지
  const [loading, setLoading] = useState(true); // 로딩 상태
  const { id } = useParams(); // URL에서 Course ID 가져오기

  const getCourseApi =
    "https://apis.data.go.kr/B552881/kmooc_v2_0/courseDetail_v2_0"; // API URL

  useEffect(() => { 
    console.log("Course ID:", id);
    fetchCourseDetail();
  }, [id]);                             //for Detail

  const fetchCourseDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const fullUrl = `${getCourseApi}?serviceKey=${process.env.REACT_APP_API_KEY}&CourseId=${id}`;
      console.log("API URL:", fullUrl);
  
      const response = await axios.get(fullUrl);
  
      console.log("API Response:", response.data);
  
      const courseDetail = response.data.results;
      if (courseDetail) {
        setCourse(courseDetail);
      } else {
        setError("Course not found.");
      }
    } catch (err) {
      console.error("Error fetching course detail:", err);
      setError("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="course-detail-loading">Loading...</div>;
  if (error) return <div className="course-detail-error-message">{error}</div>;

  return (
    <div className="course-detail-container">
      {course ? (
        <>
          <h2 className="course-detail-page-title">{course.name}</h2>
          <div className="course-detail-content">
            <img
              src={course.course_image}
              alt={course.name}
              className="course-detail-image"
            />
            <div className="course-detail-info">
            <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="course-detail-link"
              >
                View on K-Mooc
              </a>
              <p>
                <strong>Professor:</strong> {course.professor || "N/A"}
              </p>
              <p>
                <strong>Enrollment Period:</strong>{" "}
                {course.enrollment_start
                  ? `${new Date(
                      course.enrollment_start * 1000
                    ).toLocaleDateString()} - ${new Date(
                      course.enrollment_end * 1000
                    ).toLocaleDateString()}`
                  : "N/A"}
              </p>
              <p>
                <strong>Organization:</strong> {course.org_name || "N/A"}
              </p>
              <div className="course-detail-description">
                <strong>Description:</strong>
                <div
                  className="course-detail-parsed-description"
                  dangerouslySetInnerHTML={{
                    __html: course.summary || "No description available.",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3 className="course-detail-no-details-message">
          No details available for this course.
        </h3>
      )}
    </div>
  );
};

export default CourseDetail;