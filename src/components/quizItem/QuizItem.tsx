import React, {useState} from 'react';
import {IAnswer, IQuestion} from "../../App";

interface IQuizItem  extends IQuestion{
    showNextBtn: boolean
    nextQuestion: (answer: number, id: number) => void
    submit: (answer: number, id: number) => void
}

const QuizItem = (props: IQuizItem) => {
    const [answer, setAnswer] = useState<number>(-1)
    const [activeBtn, setActiveBtn] = useState<number>()
    const radioHanler = (e: any) => {
        e.currentTarget.firstElementChild.checked = true
        setActiveBtn(+e.currentTarget.id)
        setAnswer(+e.currentTarget.firstElementChild.id)
    }

    const saveAnswer = () => {
        props.nextQuestion(answer, props.id)
    }
    const submit = () => {
        props.submit(answer, props.id)
    }
    let classNameText: string
    return (
        <div className={'quiz'}>
            <h2>{props.title}</h2>
            <ul>
                {props.variants.map((v, index) => {
                    return <li className={activeBtn === index ? 'active-btn' : ''} key={index} id={String(index)} onClick={radioHanler}><input id={String(index)} name={String(props.id)} type="radio"/><span>{++index}. {v}</span></li>
                })}
            </ul>
            <div className="btns">
                {props.showNextBtn && <button onClick={saveAnswer} type={'submit'}>Следующий</button> || <button onClick={submit}>Завершить</button>}
            </div>
        </div>
    );
};

export default QuizItem;