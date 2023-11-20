import supabase from "../config/supabaseClient"
import { useEffect, useState} from 'react'
import FormQuestionComponent from "./FormQuestionComponent";
import "../css/FormEvaluationQuestionRadiosCo.css";

const FormEvaluationQuestionRadiosCo = ({counter, setCounter, incrementCountOnce, setTotalScore, storeScore, dynamicFields, setDynamicFields}) => {

    const [fetchError, setFetchError] = useState(null)
    const [questions, setQuestions] = useState(null)


    useEffect(() => {
        const fetchQuestion = async () => {
            const { data, error } = await supabase
            .from('questions')
            .select()
            .order('question_number', { ascending: true });

            if (error) {    
                setFetchError('No data found.')
                setQuestions(null)
                setTotalScore(null)
                console.log(error)
            }
            if (data) {
                console.log(data)
                setTotalScore(data.length)
                setQuestions(data)
                setFetchError(null)
            }
        }

        fetchQuestion()
    }, [])
    
    
  return (
    <div className="form-evaluation-question-container">
        {fetchError && (<p>{fetchError}</p>)}
        {questions && (
            <div className="form-evaluation-question-container"> 
                {questions.map(question => (
                    <FormQuestionComponent 
                        number ={question.question_number} 
                        key={question.question_id} 
                        question={question} 
                        counter = {counter} 
                        setCounter = {setCounter} 
                        incrementCountOnce = {incrementCountOnce} 
                        storeScore = {storeScore} 
                        dynamicFields = {dynamicFields}
                        setDynamicFields = {setDynamicFields} />
                ))}
            </div>
        )}
    </div>
  )
};

export default FormEvaluationQuestionRadiosCo;
