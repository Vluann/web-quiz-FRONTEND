import { getCookie } from "../../helper/cookies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.scss";
import ListQuiz from "../../components/listQuiz/lisquiz";
import { useEffect, useState } from "react";
import { getAnswerById } from "../../services/answerServices";
import { getTopicDetail } from "../../services/topicServices";

function DashBoard() {
    const fullName = getCookie("fullname");
    const idUser = getCookie("id");
    console.log(idUser);
    const [dataAnswers, setDataAnswers] = useState(null);
    const [avg, setAvg] = useState(0);
    const [dataLast, setDataLast] = useState(null);
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            if (!idUser) return;

            const response = await getAnswerById(idUser);
            console.log(response)
            
            if (
                !response ||
                !response.responseData ||
                !Array.isArray(response.responseData.results) ||
                response.responseData.results.length === 0
            ) {
                return;
            }

            setDataAnswers(response);

            const totalScore = response.responseData.results.reduce(
                (initial, item) => initial + (item.avgScore || 0),
                0
            );

            const avgScore =
                totalScore / response.responseData.results.length;
            setAvg(avgScore.toFixed(2));

            const last = response.responseData.results.length;
            const lastResult =
                response.responseData.results[last - 1];
            setDataLast(lastResult);

            const getTopics = await getTopicDetail(lastResult.topicId);
            console.log(getTopics)
            const topicDetail = getTopics.find(
                (item) => item._id === lastResult.topicId
            );

            setTopics(topicDetail);
        };

        fetchApi();
    }, [idUser]);

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-sayhi">
                    <h2>Xin chào, {fullName} 👋</h2>
                    <p>Chọn một quiz bên dưới để bắt đầu thử thách kiến thức của bạn!</p>
                </div>

                {dataAnswers && (
                    <>
                        <div className="dashboard-menu">
                            <div className="row">
                                <div className="col-3">
                                    <h2>Quiz đã làm</h2>
                                    <span>{dataAnswers.responseData.results.length}</span>
                                </div>

                                <div className="col-3">
                                    <h2>Tổng Lượt Thi</h2>
                                    <span>{dataAnswers.responseData.results.length}</span>
                                </div>

                                <div className="col-3">
                                    <h2>Điểm Trung Bình</h2>
                                    <span>{avg}%</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="dashboard-listquiz">
                    <ListQuiz />
                </div>

                <div className="dashboard-data__last">
                    {dataLast && topics && (
                        <>
                            <div className="row">
                                <div className="dashboard-data__menu">
                                    <h2>📊 Kết quả gần đây</h2>
                                    <div className="dashboard-data__first">
                                        <span>Quiz</span>
                                        <span>Điểm</span>
                                        <span>Phần Trăm</span>
                                        <span>Thời Gian Hoàn Thành</span>
                                    </div>

                                    <div className="dashboard-data__second">
                                        <span>{topics.name}</span>
                                        <span>{dataLast.totalCorrect}/{dataLast.totalQuestions}</span>
                                        <span>{dataLast.avgScore}%</span>
                                        <span>{dataLast.completionTime}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
