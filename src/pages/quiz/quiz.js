import { useEffect, useState } from "react";
import { getListQuestion } from "../../services/questionServices";
import { useParams } from "react-router-dom";
import QuestionItem from "../../components/questionItem/questionItem";
import HeaderQuestion from "../../components/headerQuestion/headerQuestion";

function Quiz() {
    const [dataQuestion, setDataQuestion] = useState([]);
    const params = useParams();
    console.log(params)
    useEffect(() => {
        const fetchApi = async () => {
            const questions = await getListQuestion(params.id);
            setDataQuestion(questions);
            console.log(questions)
        };
        if (params.id) fetchApi();
    }, [params.id]);
    return (
        <>
            {dataQuestion.length > 0 && (
                <div className="quiz">
                    <HeaderQuestion />
                    <QuestionItem dataQuestion={dataQuestion} />
                </div>
            )}
        </>
    )
}

export default Quiz;