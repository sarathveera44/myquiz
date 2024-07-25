import React, { Fragment, useState } from "react";
import Questions from "./Questions";

function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const replay = () => {
    setQuestionIndex(0);
    setScore(0);
    setResults(false);
    setSelectedOption(null);
    setCorrectAnswer(null);
  };

  const presentQuestion = Questions[questionIndex];

  const getClick = (selectIndex) => {
    setSelectedOption(selectIndex);
    setCorrectAnswer(presentQuestion.answer);

    if (presentQuestion.answer === selectIndex) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < Questions.length) {
        setQuestionIndex(nextQuestion);
        setSelectedOption(null);
        setCorrectAnswer(null);
      } else {
        setResults(true);
      }
    }, 1000); // Wait 1 second before moving to the next question
  };

  return (
    <Fragment>
      <div className="bg-fuchsia-300 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full shadow-md rounded-lg p-4">
          <h1 className="text-lg sm:text-xl md:text-2xl text-gray-800 text-center bg-zinc-300 p-2 rounded mb-2">
            Java Questions
          </h1>
          {results ? (
            <div className="bg-slate-500 flex flex-col justify-center items-center p-4 text-white rounded">
              <h3 className="text-lg sm:text-xl md:text-2xl">
                Score: {score}/{Questions.length}
              </h3>
              <button
                className="bg-green-600 p-2 rounded-md mt-4 text-white hover:bg-green-700 transition"
                onClick={replay}
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="flex flex-col p-4 text-lg">
              <h4 className="mb-4 text-center">{presentQuestion.question}</h4>
              <div className="text-center">
                <ul className="space-y-2">
                  {presentQuestion.options.map((choose, getIndex) => {
                    let optionClass = "bg-zinc-200 px-4 py-2 rounded-xl text-black cursor-pointer transition";
                    
                    if (selectedOption !== null) {
                      if (getIndex === presentQuestion.answer) {
                        optionClass += " bg-green-500";
                      } else if (getIndex === selectedOption) {
                        optionClass += " bg-red-500";
                      }
                    }
                    
                    return (
                      <li
                        key={getIndex}
                        className={optionClass}
                        onClick={() => getClick(getIndex)}
                      >
                        {choose}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Quiz;
