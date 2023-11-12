import "../css/FormQuestionComponent.css";
import { useState, useEffect, useRef } from 'react';
import React from "react";


const FormQuestionComponent = ({question, counter, setCounter}) => {

  function onChangeValue(event) {
    var score = event.target.id;
    console.log('score: ', score);
  }

  const [count, setCount] = useState(0);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    console.log('counter: ', counter);
  }, [count, counter]);

  const incrementCountOnce = () => {
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      if (count === 0) {
        setCount(prevCount => prevCount + 1);
        setCounter(counter => counter + 1);
      }
    }
  };

  return (
      <div className="form-question-component">
        <div className="form-likert-score-container" onClick = {incrementCountOnce}>
            <input className="form-likert-scale-1" id = "1" onChange={onChangeValue}  key = "1" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-2" id = "2" onChange={onChangeValue} key = "2" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-3" id = "3" onChange={onChangeValue} key = "3" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-4" id = "4" onChange={onChangeValue} key = "4" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-5" id = "5" onChange={onChangeValue} key = "5" name={question.question_id} required={true} type="radio" />
        </div>
        <div className="form-question-title">
            {question.question_text}
        </div>
        
        <div className="form-question-number">{question.question_id}
        </div>   
    </div>
  );
};

export default FormQuestionComponent;
