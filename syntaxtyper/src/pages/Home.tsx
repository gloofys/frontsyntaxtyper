import {useState} from "react";
import {useParams} from "react-router-dom";
import TypingBox from "../components/Typingbox.tsx";

const Home = () => {
    const {language} = useParams<{ language: string }>();
    const [selectedLanguage] = useState("react");
    return (
        <div className="p-4">
            <h2 className = "text-2xl font-bold">Welcome to {language} Typing Challenges</h2>
            <TypingBox selectedLanguage={selectedLanguage}/>
        </div>

    );
};

export default Home;