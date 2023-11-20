import "../css/FormQuestionComponent.css";
import { useState, useEffect, useRef } from 'react';
import React from "react";


const FormQuestionComponent = ({question, number, counter, setCounter, storeScore, dynamicFields, setDynamicFields}) => {

  const question_id = question.question_id;
  const student_id = 1;
  const subject_id = 1;
  
  const [count, setCount] = useState(0);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    console.log('counter: ', counter);
    console.log(dynamicFields);
  }, [count, dynamicFields]);

  const incrementCountOnce = () => {
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      if (count === 0) {
        setCount(prevCount => prevCount + 1);
        setCounter(counter => counter + 1);
      }
    }
  };

  const onChangeValue = (event) =>  {
    var score = event.target.id;
    const answer_score = Number(score)
    const updatedFields = [...dynamicFields.slice(0, number), {
        question_id,
        subject_id,
        student_id,
        answer_score,
      }, ...dynamicFields.slice(number + 1)];
    setDynamicFields(updatedFields);
  }

  return (
      <div className="form-question-component">
        <div className="form-likert-score-container" id = {question.question_order}>
            <input className="form-likert-scale-1" id = "1" onClick = {incrementCountOnce} onChange={onChangeValue} number = {number} key = "1" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-2" id = "2" onClick = {incrementCountOnce} onChange={onChangeValue} number = {number} key = "2" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-3" id = "3" onClick = {incrementCountOnce} onChange={onChangeValue} number = {number} key = "3" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-4" id = "4" onClick = {incrementCountOnce} onChange={onChangeValue} number = {number} key = "4" name={question.question_id} required={true} type="radio" />
            <input className="form-likert-scale-5" id = "5" onClick = {incrementCountOnce} onChange={onChangeValue} number = {number} key = "5" name={question.question_id} required={true} type="radio" />
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
