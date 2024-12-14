import axios from "axios";

const server = 'https://apis.data.go.kr/B552881/kmooc_v2_0';
//const key = 'dE7ZbJ+ijzNdsmgmIk7L+C1S5NA3RAKada/Fo2g8a4WVbr7q2Us/2L7V7uvzMXsnWzaRgl1YJ6onzyqnDxeJaQ==';

export const getCourseList = async () => {
    try {
        const res = await axios.get(`${server}/courseList_v2_0?serviceKey=${key}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};

export const getCourseDetail = async () => {
    try {
        const res = await axios.get(`${server}/courseDetail_v2_0?serviceKey=${key}`);
        if (res.data?.body) {
            return res.data.body;
        }
    } catch (err) {
        console.error(err);
    }
};