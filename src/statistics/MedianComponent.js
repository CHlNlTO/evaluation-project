import { useState, useEffect} from 'react'

function MedianComponent({question_id, scores}) {
  const [median, setMedian] = useState(0)

  useEffect(() => {
    async function CalculateMedian() {
      
      const calculatedMedian = calculateMedian(scores);
      console.log("CalculatedMedian Scores: ", scores);
      setMedian(calculatedMedian);

    }

    CalculateMedian();
  }, [scores]); 

  function calculateMedian(scores) {

    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return null;
    }


    const sortedScores = [...scores].sort((a, b) => a.answer_score - b.answer_score);
    const length = sortedScores.length;

    if (length === 0) {

      setMedian(null);

    } else if (length % 2 === 1) {

      return sortedScores[Math.floor(length / 2)].answer_score;

    } else {

      return (sortedScores[length / 2 - 1].answer_score + sortedScores[length / 2].answer_score) / 2;

    } 

  }

  return (
    median
  );
};

export default MedianComponent