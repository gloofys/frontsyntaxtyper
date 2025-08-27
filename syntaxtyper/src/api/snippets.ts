import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchSnippet = async (language?: string) => {
    try {
        const url = language ? `${API_URL}/snippets?language=${language}` : `${API_URL}/snippets`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching snippet", error);
        return null;
    }
};