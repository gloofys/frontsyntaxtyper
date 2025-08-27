
import axios from "axios";

const API_URL = "http://localhost:3000/api/lessons";

export const fetchLesson = async (language: string, lessonId: string) => {
    try {
        const url = `${API_URL}/${language}/${lessonId}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching lesson", error);
        return null;
    }
};