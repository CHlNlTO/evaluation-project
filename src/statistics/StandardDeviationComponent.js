import { useState, useEffect } from 'react';

function StandardDeviationComponent({ scores }) {
  const [standardDeviation, setStandardDeviation] = useState(null);

  useEffect(() => {
    async function calculateStandardDeviation() {
      const calculatedStandardDeviation = findStandardDeviation(scores);
      setStandardDeviation(calculatedStandardDeviation);
    }

    calculateStandardDeviation();
  }, [scores]);

  function findStandardDeviation(scores) {
    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return null;
    }


    const mean = scores.reduce((sum, score) => sum + score.answer_score, 0) / scores.length;

    const sumSquaredDifferences = scores.reduce((sum, score) => {
      const difference = score.answer_score - mean;
      return sum + difference ** 2;
    }, 0);

    // Step 3: Calculate the variance
    const variance = sumSquaredDifferences / (scores.length - 1);

    // Step 4: Calculate the standard deviation
    const calculatedStandardDeviation = Math.sqrt(variance);

    return calculatedStandardDeviation.toFixed(2);
  }

  return <div>{standardDeviation}</div>;
}

export default StandardDeviationComponent;
