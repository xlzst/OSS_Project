import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getRestaurantsAPI, getRestaurantImgAPI } from "../apis/API";

function Courses () {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // 업종 필터 상태

    const getCourses = async () => {
        try {
            const res = await getRestaurantsAPI();
            // console.log(res);
            setRestaurants(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/detail/${id}`);
    }

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