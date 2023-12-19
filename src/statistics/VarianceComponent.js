import { useState, useEffect } from 'react';

function VarianceComponent({ scores }) {
  const [variance, setVariance] = useState(null);

  useEffect(() => {
    async function calculateVariance() {
      const calculatedVariance = findVariance(scores);
      setVariance(calculatedVariance);
    }

    calculateVariance();
  }, [scores]);

  function findVariance(scores) {
    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return null;
    }

    const mean = scores.reduce((sum, score) => sum + score.answer_score, 0) / scores.length;

    const sumSquaredDifferences = scores.reduce((sum, score) => {
      const difference = score.answer_score - mean;
      return sum + difference ** 2;
    }, 0);

    const calculatedVariance = sumSquaredDifferences / (scores.length - 1);

    return calculatedVariance.toFixed(2);
  }

  return <div>{variance}</div>;
}

export default VarianceComponent;
