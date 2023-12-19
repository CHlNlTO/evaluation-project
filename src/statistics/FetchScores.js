import supabase from "../config/supabaseClient";

export async function FetchScores(evaluation_id) {
  const { data: answers, error } = await supabase
    .from('answers')
    .select('answer_id, question_id, answer_score, questions(evaluation_id)')

  if (error) {
    console.error('Error fetching answers:', error.message);
  }

  const flattenedAnswers = answers.map(answer => ({
    answer_id: answer.answer_id,
    question_id: answer.question_id,
    answer_score: answer.answer_score,
    evaluation_id: answer.questions.evaluation_id,
  }));

  const filteredAnswers = flattenedAnswers && flattenedAnswers.filter(answer => answer.evaluation_id === evaluation_id)

  return filteredAnswers;
}