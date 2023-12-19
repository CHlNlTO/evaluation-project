import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieScores }) => {
  useEffect(() => {
    console.log('Pie Scores: ', pieScores);
  }, [pieScores]);

  const scoreCounts = {};
  pieScores &&
    pieScores.forEach((score) => {
      const { answer_score } = score;
      if (answer_score !== undefined) {
        scoreCounts[answer_score] = (scoreCounts[answer_score] || 0) + 1;
      }
    });

  // Get all possible scores
  const allPossibleScores = Array.from({ length: 5 }, (_, i) => i + 1);

  // Create scoresData with counts for each possible score
  const scoresData = allPossibleScores.map((score) => ({
    score,
    count: scoreCounts[score] || 0,
  }));

  const sortedScoresData = scoresData.sort((a, b) => a.score - b.score);

  useEffect(() => {
    console.log('Scores Data: ', sortedScoresData);
  }, [sortedScoresData]);

  const scoreLabels = {
    1: '1 - Very Rarely',
    2: '2 - Rarely',
    3: '3 - Occasionally',
    4: '4 - Frequently',
    5: '5 - Very Frequently',
  };

  const data = {
    labels: sortedScoresData.map((item) => scoreLabels[item.score]),
    datasets: [
      {
        data: sortedScoresData.map((item) => item.count),
        backgroundColor: ['#511d47', '#ffcb3a', '#fe1d57', '#fe6732', '#035b96'],
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    labels: {
      generateLabels: function (chart) {
        const data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map((label, index) => {
            const dataset = data.datasets[0];
            const value = dataset.data[index];
            return {
              text: `${label}: ${value}`,
              fillStyle: dataset.backgroundColor[index],
            };
          });
        }
        return [];
      },
    },
  },
};

  return (
    <div>
      <div>
        <Pie data={data} options={chartOptions} style={{ width: '500px' }} />
      </div>
    </div>
  );
};

export default PieChart;
