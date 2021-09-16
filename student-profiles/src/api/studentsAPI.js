import axios from "axios";
const API_URL = process.env.REACT_APP_BASE_URL;

// Get student profiles
export const getStudentProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response;
  } catch (e) {
    console.error(e);
  }
};
