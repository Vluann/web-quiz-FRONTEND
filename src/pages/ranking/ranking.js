import { useEffect, useState } from "react";
import "./ranking.scss";
import { getListAnswers } from "../../services/answerServices";
import { getFullName } from "../../services/userServices";
import { getListTopics } from "../../services/topicServices";
import { getCookie } from "../../helper/cookies";

function Ranking() {
    const [dataAnswers, setDataAnswers] = useState([]);
    const [users, setUsers] = useState([]);
    const [dataTopic, setDataTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("all");

    const id = getCookie("id");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resAnswers = await getListAnswers();
                if (resAnswers.status && Array.isArray(resAnswers.data)) {
                    setDataAnswers(resAnswers.data);
                }

                const resUsers = await getFullName();
                if (resUsers.status && Array.isArray(resUsers.data)) {
                    setUsers(resUsers.data);
                }

                const resTopics = await getListTopics();
                console.log(resTopics)
                if (Array.isArray(resTopics)) {
                    setDataTopics(resTopics);
                }
            } catch (err) {
                console.error("Lỗi fetch dữ liệu:", err);
            }
        };
        fetchApi();
    }, []);

 
    const normalizeId = (val) => {
        if (!val) return "";
        return String(val).trim();
    };

    const filteredAnswers =
        selectedTopic === "all"
            ? dataAnswers
            : dataAnswers.filter(
                  (item) => normalizeId(item.topicId) === normalizeId(selectedTopic)
              );
              console.log(filteredAnswers)

    const mergedData = filteredAnswers.map((item) => {
        const userObj = users.find((u) => u._id === item.userId);
        return {
            ...item,
            fullName: userObj ? userObj.fullName : item.fullName || "Ẩn danh",
        };
    });
    console.log(mergedData)

    const scoreMap = {};
    mergedData.forEach((item) => {
        if (!scoreMap[item.userId]) {
            scoreMap[item.userId] = { total: 0, count: 0 };
        }
        scoreMap[item.userId].total += item.avgScore || 0;
        scoreMap[item.userId].count += 1;
    });

    const dataWithAvg = mergedData.map((item) => {
        const score = scoreMap[item.userId];
        return {
            ...item,
            totalScoreAvg: score
                ? Number((score.total / score.count).toFixed(2))
                : 0,
        };
    });

    const sortedRanking = [...dataWithAvg].sort(
        (a, b) => b.totalScoreAvg - a.totalScoreAvg
    );

    const myRankIndex = sortedRanking.findIndex(
        (item) => normalizeId(item.userId) === normalizeId(id)
    );
    const myRank = myRankIndex !== -1 ? myRankIndex + 1 : null;

    return (
        <div className="ranking">
            <div className="container">
                <div className="ranking-header">
                    <div className="row">
                        <h2>🏆 Bảng xếp hạng</h2>
                        <p>Xem vị trí của bạn trong bảng xếp hạng</p>
                    </div>
                </div>

                <div className="ranking-detail">
                    <div className="row">
                        <div className="ranking-detail__item">
                            <div className="ranking-select">
                                <span>Chọn Quiz:</span>
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => setSelectedTopic(e.target.value)}
                                >
                                    <option value="all">Tất cả</option>
                                    {dataTopic.map((topic) => (
                                        <option
                                            key={topic._id}
                                            value={normalizeId(topic._id || topic.id)}
                                        >
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="ranking-results">
                                {myRank
                                    ? `🏅 Hạng của bạn: #${myRank}`
                                    : "Bạn chưa có hạng"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ranking-users">
                    <div className="ranking-users__menu">
                        {sortedRanking.slice(0, 3).map((user, index) => (
                            <div
                                className="ranking-users__rankItem"
                                key={user.userId + index}
                            >
                                <div className="ranking-users__rankItem-rank">
                                    {index === 0
                                        ? "🥇"
                                        : index === 1
                                        ? "🥈"
                                        : "🥉"}
                                </div>
                                <div className="ranking-users__rankItem-name">
                                    {user.fullName}
                                </div>
                                <div className="ranking-users__rankItem-avg">
                                    {user.totalScoreAvg}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Hạng</th>
                            <th>Người Chơi</th>
                            <th>Quiz Hoàn Thành</th>
                            <th>Điểm TB</th>
                            <th>Điểm Cao Nhất</th>
                            <th>Tổng Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRanking.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.totalQuestions}</td>
                                <td>{item.totalScoreAvg}%</td>
                                <td>{item.percentScore}%</td>
                                <td>{item.totalCorrect}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Ranking;
