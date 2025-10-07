import { useEffect, useState } from "react";
import { getListTopics } from "../../services/topicServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "./listquiz.scss";
import { countQuestion } from "../../services/questionServices";
import { Link } from "react-router-dom";
import { getAnswerById } from "../../services/answerServices";
import { getCookie } from "../../helper/cookies";

function ListQuiz() {
  const [dataListQuiz, setDataListQuiz] = useState([]);
  const [countQuestions, setCountQuestions] = useState({});
  const [checkAnswers, setCheckAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const id = getCookie("id");

      const response = await getListTopics();
      const cntQuestions = await countQuestion();
      const listAnswers = await getAnswerById(id);


      const countsObj = cntQuestions[0] || {};
      setCountQuestions(countsObj);

      setDataListQuiz(response.reverse());

      if (
        listAnswers &&
        listAnswers.responseData &&
        Array.isArray(listAnswers.responseData.results)
      ) {
        setCheckAnswers(listAnswers.responseData.results);
      } else {
        setCheckAnswers([]);
      }
    };

    fetchApi();
  }, []);

console.log(dataListQuiz)

  return (
    <>
      {dataListQuiz.length > 0 && (
        <div className="listquiz">
          <h2>📚 Danh sách Quiz</h2>
          <div className="row">
            {dataListQuiz.map((item) => {

              const isDone = checkAnswers.some(
                (ans) => String(ans.topicId) === String(item._id)
              );

              const totalQues = countQuestions[`topicId_${item._id}`] || 0;

              return (
                <div className="col-3" key={item._id}>
                  <div className="listquiz-item" id={item._id}>
                    <div className="listquiz-item__title">
                      <h2>{item.name}</h2>
                    </div>
                    <p>Trả lời các câu hỏi trắc nghiệm về kiến thức AI...</p>

                    <div className="listquiz-item__menu">
                      <span>{totalQues} câu hỏi</span>
                      <span>⏱️ 60 phút</span>
                      <span>{isDone ? "1/1 lượt" : "0/1 lượt"}</span>
                    </div>

                    <button
                      type="button"
                      className={`btn ${isDone ? "btn-secondary" : "btn-success"}`}
                      disabled={isDone}
                    >
                      {!isDone ? (
                        <Link to={`/quiz/${item._id}`}>Bắt Đầu Làm Bài</Link>
                      ) : (
                        <span>Đã Hoàn Thành</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ListQuiz;
