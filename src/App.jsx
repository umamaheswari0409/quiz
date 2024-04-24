import { useEffect, useState } from 'react';
import './App.css';
import questionData from "./question.json";

function App() {

  const [currentQuestion, setCurrentQuestion] =
  useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowscore] = useState(false);
  const [timer, setTimer] = useState(10);
  
  useEffect(()=> {
     let interval;
     if(timer>0 && ! showScore) {
      interval=setInterval(() => {
        setTimer((prevTimer)=>prevTimer - 1);
      }, 1000);
     } else {
      clearInterval (interval);
      setShowscore(true);
     }
     return() => clearInterval(interval);


  }, [timer, showScore]);
  
  const handleAnswerClick = (selectedOption) => {
    if (selectedOption ===questionData
      [currentQuestion].correctOption){
        setScore((prevScore) => prevScore + 1);

      }
      if (currentQuestion < questionData.length -1)
      {
        setCurrentQuestion ((prevQuestion)=>
        prevQuestion + 1);
        setTimer(10);  
      
      } else {
        setShowscore(true);
      }
    };
  
    const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowscore(0);
    setTimer(10);

  }

  return (
    
      <div className='quiz-app'>
      {showScore ? (
        <div className='score-section'>
          <h2>
            Your Score : {score}/{questionData.
            length}
          </h2>
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>
      ): ( <div className='question-section'>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questionData[currentQuestion].
      question}</p>
      <div className='option'>
        {questionData[currentQuestion].
        option.map((Option,index)=>(
          <button key={index} onClick={()=>
          handleAnswerClick(Option)}>
          {Option}</button>
        ))}
      </div>
    <div className='timer'>
      Time Left: <span>{timer}s</span>
    </div>
    </div>)
    }
      
     
      </div>
    
  );
}

export default App;
