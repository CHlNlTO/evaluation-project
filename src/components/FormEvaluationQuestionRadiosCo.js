import supabase from "../config/supabaseClient"
import { useEffect, useState} from 'react'
import FormQuestionComponent from "./FormQuestionComponent";
import "../css/FormEvaluationQuestionRadiosCo.css";

const FormEvaluationQuestionRadiosCo = () => {

    const [fetchError, setFetchError] = useState(null)
    const [questions, setQuestions] = useState(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            const { data, error } = await supabase
            .from('questions')
            .select()

            if (error) {    
                setFetchError('No data found.')
                setQuestions(null)
                console.log(error)
            }
            if (data) {
                console.log(data)
                setQuestions(data)
                setFetchError(null)
            }
        }

        fetchQuestion()
    }, [])

    const [counter, setCounter] = useState(0);
  return (
    <div className="form-evaluation-question-container">
        {fetchError && (<p>{fetchError}</p>)}
        {questions && (
            <div className="form-evaluation-question-container"> 
                {questions.map(question => (
                    <FormQuestionComponent key={question.question_id} question={question} counter = {counter} setCounter = {setCounter}/>
                ))}
            </div>
        )}
    </div>
  )
};

export default FormEvaluationQuestionRadiosCo;
