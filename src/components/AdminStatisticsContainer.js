import "./AdminStatisticsContainer.css";
import MeanComponent from '../statistics/MeanComponent';
import MedianComponent from "../statistics/MedianComponent";
import ModeComponent from "../statistics/ModeComponent";
import StandardDeviationComponent from "../statistics/StandardDeviationComponent";
import VarianceComponent from "../statistics/VarianceComponent";
import { FetchScores } from "../statistics/FetchScores";
import { useState, useEffect } from 'react'

const AdminStatisticsContainer = ({evaluation_id, question_id, setPieScores, pieScores}) => {

  const [answers, setAnswers] = useState([])
  const [scores, setScores] = useState({})

  const [meanProgress, setMeanProgress] = useState(100)
  const progressWidth = {width: `${meanProgress}%`}

  useEffect(() => {

    const fetchAnswers = async () => {
      const fetchedAnswers = await FetchScores(evaluation_id, question_id);
      setAnswers(fetchedAnswers)
    }

    fetchAnswers();
    
  }, [evaluation_id])

  useEffect(() => {
    console.log("Answers: ", answers);
  }, [answers]);

  useEffect(() => {

    const fetchScores = () => {
      const fetchedScores = answers && answers.filter(answer => answer.question_id === question_id)
      setScores(fetchedScores)
      setPieScores(fetchedScores)
    }


    fetchScores();

  }, [question_id])

  useEffect(() => {
    console.log("Pie Chart Scores: ", pieScores);
  }, [pieScores]);

  

  return (
    <div className="admin-statistics-central-tende">
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Mean</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            <MeanComponent  
              question_id = {question_id} 
              setMeanProgress = {setMeanProgress} 
              scores = {scores} />
          </div>
          <div className="admin-statistics-score-title-c1">
            <div className="admin-statistics-score-title-c2">
              <div className="admin-statistics-score-title-c3" style = {progressWidth}/>
            </div>
          </div>
          <div className="admin-statistics-current-score">5</div>
        </div>
      </div>
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Median</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            <MedianComponent 
              question_id = {question_id} 
              scores = {scores} />
          </div>
        </div>
      </div>
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Mode</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            <ModeComponent 
              question_id = {question_id} 
              scores = {scores}   />
            </div>
        </div>
      </div>
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Standard Deviation</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            <StandardDeviationComponent 
              question_id = {question_id} 
              scores = {scores}   />
          </div>
        </div>
      </div>
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Variance</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            <VarianceComponent 
              question_id = {question_id} 
              scores = {scores}   />
          </div>
        </div>
      </div>
      <div className="admin-statistics-container">
        <div className="admin-statistics-title-contain">
          <div className="admin-statistics-title">Total Respondents</div>
        </div>
        <div className="admin-statistics-score-title-c">
          <div className="admin-statistics-current-score">
            {scores && scores.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatisticsContainer;
