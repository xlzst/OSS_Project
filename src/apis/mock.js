import axios from "axios";

const url = 'https://675ae1579ce247eb1934ea3d.mockapi.io/course';

export const getMyCourseList = async () => {
    try {
        const res = await axios.get(`${url}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};