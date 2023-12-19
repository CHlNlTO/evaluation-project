import { useEffect, useState } from 'react';

function ModeComponent({ scores }) {
  const [modes, setModes] = useState(null);

  useEffect(() => {
    async function calculateMode() {
      const calculatedModes = findMode(scores);
      setModes(calculatedModes);
    }

    calculateMode();
  }, [scores]);

  function findMode(scores) {
    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return null;
    }

    const scoreCounts = {};
    scores.forEach((score) => {
      const { answer_score } = score;
      if (answer_score !== undefined) {
        scoreCounts[answer_score] = (scoreCounts[answer_score] || 0) + 1;
      }
    });

    let modes = [];
    let maxCount = 0;
    for (const score in scoreCounts) {
      const count = scoreCounts[score];
      if (count > maxCount) {
        modes = [score];
        maxCount = count;
      } else if (count === maxCount) {
        modes.push(score);
      }
    }

    return modes.length === 1 ? modes : modes.length > 0 ? modes : null;
  }

  return <div>{modes && Array.isArray(modes) ? modes.join(', ') : ''}</div>;
}

export default ModeComponent;
