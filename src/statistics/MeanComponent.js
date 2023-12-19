import { useEffect, useState } from 'react';

function MeanComponent({ setMeanProgress, scores }) {
  const [mean, setMean] = useState(0);

  useEffect(() => {
    async function CalculateMean() {
      const mean = calculateMean(scores);
      const meanProgress = ((mean / 5) * 100);
      setMeanProgress(meanProgress);
      setMean(mean);
    }

    CalculateMean();
  }, [scores]);

  function calculateMean(scores) {

    if (!Array.isArray(scores) || scores.length === 0) {
      return 0;
    }

    const sum = scores.reduce((acc, value) => acc + value.answer_score, 0);
    const mean = sum / scores.length;

    return mean.toFixed(2);
  }

  return mean;
}

export default MeanComponent;
