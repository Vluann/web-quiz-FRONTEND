import { useEffect, useState } from "react";
import "./myResults.scss";
import { getAnswerById } from "../../services/answerServices";
import { getCookie } from "../../helper/cookies";
import { getListTopics } from "../../services/topicServices";
import { Link } from "react-router-dom";

function MyResults() {
    const [dataFinal, setDataFinal] = useState([]);
    const [avg, setAvg] = useState(0);
    const [scoreMax, setScoreMax] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const idUser = getCookie("id");

    useEffect(() => {
        const fetchApi = async () => {
            if (!idUser) return;

            const answers = await getAnswerById(idUser);

            if (
                !answers ||
                !answers.responseData ||
                !Array.isArray(answers.responseData.results) ||
                answers.responseData.results.length === 0
            ) {
                setDataFinal([]);
                setAvg(0);
                setScoreMax(0);
                setTotalScore(0);
                return;
            }

            const getTopics = await getListTopics();
            const dataTopics = answers.responseData.results.map((item) => {
                const topicFinal = getTopics.filter(
                    (itemTopic) => itemTopic._id === item.topicId
                );
                return {
                    ...item,
                    topicName: topicFinal,
                };
            });

            const totalAvg = dataTopics.reduce((initial, item) => {
                return initial + item.avgScore;
            }, 0);
            const totalavgTb = totalAvg / dataTopics.length;
            setAvg(totalavgTb.toFixed(2));

            setDataFinal(dataTopics);

            let maxScore = 0;
            for (let i = 0; i < dataTopics.length; i++) {
                if (dataTopics[i].totalCorrect > maxScore) {
                    maxScore = dataTopics[i].totalCorrect;
                }
            }
            setScoreMax(maxScore);

            let sum = 0;
            for (let results of dataTopics) {
                sum += results.totalCorrect;
            }
            setTotalScore(sum);
        };
        fetchApi();
    }, [idUser]);


    return (
        <div className="my-results">
            <div className="container">
                <div className="my-results__dashboard">
                    <h2>📊 Kết quả làm Quiz của tôi</h2>
                    <p>Xem lại tất cả kết quả và tiến trình học tập của bạn</p>
                </div>

                <div className="my-results__menu">
                    <div className="my-results__menu-item">
                        <span>Quiz đã làm</span>
                        <span>{dataFinal.length || 0}</span>
                    </div>
                    <div className="my-results__menu-item">
                        <span>Tổng lượt thi</span>
                        <span>{dataFinal.length || 0}</span>
                    </div>
                    <div className="my-results__menu-item">
                        <span>Điểm trung bình</span>
                        <span>{avg || 0}</span>
                    </div>
                    <div className="my-results__menu-item">
                        <span>Điểm cao nhất</span>
                        <span>{scoreMax || 0}</span>
                    </div>
                    <div className="my-results__menu-item">
                        <span>Tổng điểm</span>
                        <span>{totalScore || 0}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="my-results-data__menu">
                        <h2>📊 Kết quả gần đây</h2>
                        <div className="my-results-data__first">
                            <span>Quiz</span>
                            <span>Điểm</span>
                            <span>Phần Trăm</span>
                            <span>Thời Gian Hoàn Thành</span>
                            <span>Chi Tiết</span>
                        </div>
                        <div className="my-results-data__second">
                            {dataFinal.length > 0 ? (
                                dataFinal.map((item, index) => (
                                    <div className="my-results-data__item" key={index}>
                                        <span>{item.topicName[0]?.name || "Không xác định"}</span>
                                        <span>{item.totalCorrect}/{item.detail.length}</span>
                                        <span>{item.avgScore}%</span>
                                        <span>{item.completionTime}</span>
                                        <span>
                                            <Link to={`/result-item/${item._id}`}>Xem Chi Tiết</Link>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="my-results-data__item">
                                    <span colSpan="5">Chưa có dữ liệu</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyResults;
