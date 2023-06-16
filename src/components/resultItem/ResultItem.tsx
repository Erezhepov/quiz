import React from 'react';
import {IAnswer} from "../../App";

export interface IResultItem {
    countCorrectAnswers: number
    countAnswer: number
    answers: IAnswer[]
    passAgain: () => void
    review: () => void
}


const ResultItem = (props: IResultItem) => {

    const passAgain = () => {
        props.passAgain()
    }
    const review = () => {
        props.review()
    }

    return (
        <div className={'result-item'}>
            <h3 className={'title'}>
                Ты решил {props.countCorrectAnswers} из {props.countAnswer}!
            </h3>
            <div className="btns">
                {/*<button onClick={review}>Пересмотр</button>*/}
                <button onClick={passAgain}>Пройти еще раз</button>
            </div>
        </div>
    );
};

export default ResultItem;