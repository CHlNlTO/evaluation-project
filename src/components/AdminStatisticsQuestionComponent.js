import "./AdminStatisticsQuestionComponent.css"
import { useState, useEffect } from "react";

const AdminStatisticsQuestionComponent = ({ question, toggleStatBody, setQuestion }) => {

  const handleClick = () => {

    toggleStatBody();
    setQuestion(question);
  }

  return (
    <div className="admin-statistics-question-cont" onClick = {() => {handleClick()}}>
          <div className="admin-statistics-question-titl">
            <button className="admin-statistics-question-titl1">
              <ul className="question-text">{question.question_number}. {question.question_text}</ul>
            </button>
          </div>
        </div>
  );
}

export default AdminStatisticsQuestionComponent;