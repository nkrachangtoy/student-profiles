import axios from "axios";
const BASE_URL = "https://api.hatchways.io/assessment/students";

    // Get student profiles
export const getStudentProfiles = async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            return response;
        } catch (e) {
            console.log(e)
        }
    }