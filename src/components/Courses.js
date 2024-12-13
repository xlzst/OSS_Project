import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div>
            <div>
                <p>Checking Error</p>
            </div>
        </div>
    );
}

export default Courses;