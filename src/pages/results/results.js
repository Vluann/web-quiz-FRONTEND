import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswersDetail } from "../../services/answerServices";
function Results() {
    const [dataAnswers,setDataAnswers] = useState([]);
    const params = useParams();
    console.log(params)

    useEffect(() => {
        const fetchApi = async () => {
            const response = await AnswersDetail(params.id);
            console.log(response);
        };
        fetchApi();
    },[])
    return (
        <>
            
        </>
    )
}

export default Results;