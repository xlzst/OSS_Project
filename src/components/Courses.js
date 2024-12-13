import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCourseList, getCourseDetail } from "../apis/API";

function Courses () {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // 업종 필터 상태

    const getCourses = async () => {
        try {
            const res = await getCourseList();
            // console.log(res);
            setCourses(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <Div>
            <RestWrapper>
                {filteredRestaurants.map((restaurant) => (
                    <CourseCard key={restaurant.RSTR_ID} onClick={() => handleCardClick(restaurant.RSTR_ID)}>
                    </CourseCard>
                ))}
            </RestWrapper>
        </Div>
    );
}

export default Courses;