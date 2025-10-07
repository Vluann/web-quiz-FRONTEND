import "./resultsDetails.scss";

function ResultsDetail({ dataQuestion, dataAnswers }) {
  const mappedQuestions = dataQuestion.map((item) => {
    const answerObj = dataAnswers.find(
      (ans) => ans.questionId === item._id 
    );

    return {
      ...item,
      userAnswer: answerObj ? answerObj.userAnswer : null,
      correctAnswer: answerObj ? answerObj.correctAnswer : null,
      isCorrect: answerObj ? answerObj.isCorrect : null,
    };
  });

  return (
    <div className="wrapper">
      <div className="quiz">
        <div className="container">
          <div className="row">
            {mappedQuestions.map((item, qIndex) => (
              <div className="col-12" key={qIndex}>
                <div className="quiz-listquestion">
                  <span>Câu {qIndex + 1}</span>
                  <h2>{item.question}</h2>

                  {item.answers.map((ansText, ansIndex) => {
                    let className = "";

                    if (item.correctAnswer === ansIndex) className = "correct-true";
                    if (item.userAnswer === ansIndex && item.userAnswer !== item.correctAnswer)
                      className = "correct-false";

                    return (
                      <div key={ansIndex} className="quiz-listquestion__abs">
                        <label className={className}>
                          <input
                            type="radio"
                            checked={item.userAnswer === ansIndex}
                            readOnly
                          />
                          {ansText}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsDetail;
