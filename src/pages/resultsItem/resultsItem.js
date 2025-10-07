import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswersDetail } from "../../services/answerServices";
import { getListQuestion } from "../../services/questionServices";
import { getListTopics } from "../../services/topicServices";
import ResultsDetail from "../../components/resultsDetail/resultsDetail";
import HeaderResults from "../../components/headerResults/headerResult";
import "./resultItem.scss";

function ResultsItem() {
  const params = useParams();
  const [dataAnswers, setDataAnswers] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [dataTopic, setDataTopic] = useState(null);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AnswersDetail(params.id);
        if (!res?.data || res.data.length === 0) return;
        const result = res.data[0];

        setDataAnswers(result.detail || []);

        const questions = await getListQuestion(result.topicId);
        setDataQuestions(questions || []);

        const topics = await getListTopics();
        const topic = topics.find(
          (t) => t._id === result.topicId || t.id === result.topicId
        );
        setDataTopic(topic || null);

      } catch (err) {
        console.error("Lỗi fetch kết quả:", err);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="result-item">
      <HeaderResults dataTopic={dataTopic} />
      <ResultsDetail dataQuestion={dataQuestions} dataAnswers={dataAnswers} />
    </div>
  );
}

export default ResultsItem;
