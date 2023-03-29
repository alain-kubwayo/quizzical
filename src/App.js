import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import { nanoid } from "nanoid";


function App() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [checked, setChecked] = useState(false);
  const [questions, setQuestions] = useState([]);

  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const getQuestion = async () => {
      try{
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=18&encode=base64');
        const data = await res.json();
        let q = [];
        data.results.forEach(question => {
          q.push({
            id: nanoid(),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          });
        })
        setQuestions(q);
      }catch(err) {
        throw new Error(err);
      }
    }
    getQuestion();
  }, [count])

  const handleCheck = () => {
    let selected = true;
    questions.forEach(question => {
      if(question.selected === null){
        selected = false;
        return;
      }
    })
    if(!selected){
      return;
    }
    setQuestions(questions => questions.map(question => {
      return {...question, checked: true}
    }))
    setChecked(true);
    let correct = 0;
    questions.forEach(question => {
      if(question.correct === question.selected){
        correct++; 
      }
    })
    setCorrect(correct);
  }

  const handleClickAnswer = (id, answer) => {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

  const handlePlayAgain = () => {
    setCount(prevCount => prevCount++);
    setChecked(false);
  }

  const questionElement = questions ? questions.map(question => {
    return (
      <Question
        key={question.id}
        q={question}
        id={question.id}
        handleClickAnswer={handleClickAnswer}
      />
    )
  }) : []

  const start = () => {
    setStarted(prevStarted => !prevStarted);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
      <div className="max-w-xl">
        {
          started ? 
          <div className="flex flex-col items-center justify-center">
            {questionElement}
            <div className="flex flex-row items-center justify-center gap-[1rem] mt-4">
              {checked && <span className="text-xl font-bold">You scored: {correct}/5 correct answers</span>}
              <button className="p-4 text-white border-none bg-sky-900 rounded-xl" onClick={checked ? handlePlayAgain : handleCheck}>{checked ? 'Play Again' : 'Check Answer'}</button>
            </div>
          </div>
          :
          <Welcome 
            start={start}
          />
        }
      </div>
    </div>
  );
}

export default App;
