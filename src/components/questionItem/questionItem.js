import { useState } from "react";
import "./questionItem.scss";
import { getCookie } from "../../helper/cookies";
import { useNavigate, useParams } from "react-router-dom";
import { createAnswers } from "../../services/answerServices";
import { getTimeCurrents } from "../../helper/getTimeCurrent";

function QuestionItem({ dataQuestion }) {
    const userId = getCookie("id");
    const params = useParams();
    const navigate = useNavigate();

    const [answered, setAnswered] = useState({});

    const handleAnswer = (questionId, answerIndex) => {
        setAnswered(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const answeredCount = Object.keys(answered).length;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = Object.entries(answered).map(([questionId, answerIndex]) => ({
            name: questionId, 
            value: answerIndex
        }));

        const payload = {
            userId,
            topicId: params.id,
            answers: options,
            completionTime: getTimeCurrents()
        };

        try {
            const response = await createAnswers(payload);
            console.log("Lưu kết quả thành công:", response);
            if (response.data?._id) {
                navigate(`/result-item/${response.data._id}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi kết quả:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="wrapper">
                <div className="quiz">
                    <div className="container">
                        <div className="row">
                            {dataQuestion.map((question, qIndex) => (
                                <div className="col-12" key={question._id || qIndex}>
                                    <div className="quiz-listquestion">
                                        <span>Câu {qIndex + 1}</span>
                                        <h2>{question.question}</h2>
                                        {question.answers.map((answer, aIndex) => (
                                            <div
                                                className="quiz-listquestion__abs"
                                                key={aIndex}
                                            >
                                                <label htmlFor={`quiz-${question._id}-${aIndex}`}>
                                                    <input
                                                        type="radio"
                                                        name={question._id}
                                                        value={aIndex}
                                                        id={`quiz-${question._id}-${aIndex}`}
                                                        onChange={() => handleAnswer(question._id, aIndex)}
                                                        checked={answered[question._id] === aIndex}
                                                    />
                                                    {answer}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="quiz-listquestion__warning">
                                ⚠️ Hãy kiểm tra kỹ câu trả lời trước khi nộp bài. Bạn sẽ không thể thay đổi sau khi nộp!
                            </div>

                            <div className="quiz-submit">
                                <span>
                                    {answeredCount}/{dataQuestion.length} câu đã trả lời
                                </span>
                                <button type="submit">Nộp Bài</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default QuestionItem;
