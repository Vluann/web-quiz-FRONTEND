import { useEffect, useState } from "react";
import { getListTopics } from "../../services/topicServices";
import { useParams } from "react-router-dom";
import "./headerquestion.scss";

function HeaderQuestion() {
    const params = useParams();
    const [dataTopics, setDataTopics] = useState([]);
    const [time, setTime] = useState(60 * 60);
    useEffect(() => {
        const fetchApi = async () => {
            const topic = await getListTopics();
            const topicId = topic.find(item => item._id === params.id);
            setDataTopics(topicId);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => { clearInterval(timer) };
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div className="Header-questions">
                <div className="container">
                    <div className="Header-questions__item">
                        <div className="Header-questions__item-left">
                            <h2>{dataTopics.name}</h2>
                            <p>20 câu hỏi • 60 phút</p>
                        </div>

                        <div className="Header-questions__item-right">
                            {formatTime(time)}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default HeaderQuestion;