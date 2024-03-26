import { useState } from "react";

const questions = [
  {
    question:
      'What is the output of the following code?\n\nconsole.log(1 + "2" + "2");',
    options: ["122", "5", "14", "NaN"],
    answer: "122",
  },
  {
    question: "Which of the following is not a valid JavaScript variable name?",
    options: ["myVar", "_myVar", "2myVar", "$myVar"],
    answer: "2myVar",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question:
      'What is the correct way to include an external JavaScript file named "script.js"?',
    options: [
      '<script src="script.js">',
      '<javascript src="script.js">',
      '<js src="script.js">',
      '<script href="script.js">',
    ],
    answer: '<script src="script.js">',
  },
  {
    question:
      'What is the output of the following code?\n\nconsole.log(3 === "3");',
    options: ["true", "false", "TypeError", "SyntaxError"],
    answer: "false",
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);

    const correctAnswer = questions[currentQuestion].answer;
    const isAnswerCorrect = selectedOption === correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setScore(score + (isAnswerCorrect ? 1 : 0));

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container">
      <div className="app">
        {showScore ? (
          <div className="score-section">
            <p>
              You scored {score} out of {questions.length}
            </p>
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <>
            <div className="heading">
              <h3 className="">programming quiz</h3>
              <div
                className="progress-bar"
                style={{ width: `${progress}%`, backgroundColor: "#01e866" }}
              />
            </div>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option) => {
                const isOptionSelected = selectedOption === option;
                const isOptionCorrect = isCorrect === true && isOptionSelected;
                const isOptionWrong = isCorrect === false && isOptionSelected;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerOptionClick(option)}
                    style={{
                      border: `1.5px solid ${
                        isOptionCorrect
                          ? "#01e866"
                          : isOptionWrong
                          ? "red"
                          : "black"
                      }`,
                      backgroundColor: isOptionCorrect
                        ? "#01e866"
                        : isOptionWrong
                        ? "red"
                        : "",
                      color: isOptionCorrect || isOptionWrong ? "#fff" : "#000",
                    }}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
