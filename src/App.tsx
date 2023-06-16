import React, {useState} from 'react';
import QuizItem from "./components/quizItem/QuizItem";
import ResultItem from "./components/resultItem/ResultItem";

export interface IQuestion {
    id: number
    title: string
    variants: string[]
    correct: number
}

export interface IAnswer {
    id: number,
    answer: number
}


function App() {
    const [questions, setQuestions] = useState<IQuestion[]>([
        {id: 1,title: 'Что такое HTML?', variants: ['Hyper Text Markup Language','High Tech Markup Language','Hyperlinks and Text Markup Language','Home Tool Markup Language'], correct: 0},
        {id: 2, title: 'Какой элемент используется для создания заголовка верхнего уровня в HTML?', variants: ['<h1>','<h2>','<head>','<header>'], correct: 0},
        {id: 3, title: 'Какой атрибут HTML используется для определения стилей элемента?', variants: ['style','class','id','src'], correct: 0},
        {id: 4, title: 'Какой элемент используется для создания ненумерованного списка в HTML?', variants: ['<ul>','<ol>','<li>','<div>'], correct: 0},
        {id: 5, title: 'Какое свойство CSS используется для изменения цвета текста?', variants: ['background-color','font-color','color','fill'], correct: 2},
    ])
    const [answers, setAnswers] = useState<IAnswer[]>([])
    const [result, setResult] = useState<number>(0)
    const [step, setStep] = useState(1)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [showNextBtn, setShowNextBtn] = useState<boolean>(true)
    let sortedQuestions = questions.filter(q => q.id === step)
    const changeAnswer = (answer: number, id: number) => {
        let item = questions.filter(q => q.id === id)[0]
        setAnswers([...answers, {id, answer}])
        if (questions.at(-2) === item){
            setShowNextBtn(false)
        }
        if (item){
            if (item.correct === answer){
                setResult(result + 1)
            }
        }
    }
    const nextQuestion = (answer: number, id: number) => {
        changeAnswer(answer, id)
        setStep(step + 1)
    }
    const submit = (answer: number, id: number) => {
        changeAnswer(answer, id)
        setShowResult(true)
    }
    const passAgain = () => {
        setResult(0)
        setStep(1)
        setShowNextBtn(true)
        setShowResult(false)
    }
    const review = () => {

    }


  return (
      <div className="wrapper">
        <h1>Quiz</h1>
          {!showResult && <div className={'questions'}>
              {sortedQuestions.map(q => <QuizItem showNextBtn={showNextBtn} submit={submit} nextQuestion={nextQuestion} key={q.id} id={q.id} title={q.title} variants={q.variants} correct={q.correct} />)}
          </div>}
          {showResult && <ResultItem review={review} answers={answers} passAgain={passAgain} countCorrectAnswers={result} countAnswer={questions.length} />}
      </div>
  )
}

export default App;
