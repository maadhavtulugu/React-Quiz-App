import React, { useState } from 'react'
import "./Question.css"
import { ErrorMessage } from './ErrorMessage';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const Question = ({currQues,setCurrQues,questions,options,correct,score,setScore,setQuestions}) => {
  
    const [selected,setSelected]=useState();
    const [error,setError]=useState(false);
    const navigate = useNavigate();

    const handleSelect=(i)=>{
        if(selected===i && i===correct)
            return "select";
        else if(selected===i && i!==correct)
            return "wrong";
        else if(i===correct)
            return "select";
    };
    const handleCheck=(i)=>{
        setSelected(i);
        if(i===correct)
            setScore(score+1);
        setError(false);
    }

    const handleNext=()=>{
        if(currQues>8)
            navigate('/result');
        else if(selected){
            setCurrQues(currQues+1);
            setSelected();
        }
        else{
            setError("Please Select An Option");
        }
    }
    const handleQuit=()=>{

    }
    return (
    <div className='question'>
        <h2>Question: {currQues+1}</h2>
        <div className='singleQuestion'>
            <h2>{questions[currQues].question}</h2>
            <div className='options'>
                {  error && <ErrorMessage>{error}</ErrorMessage>}
                
                {    options && 
                        options.map((i)=>
                            <button
                                className={`singleOption ${selected && handleSelect(i)}`}
                                onClick={()=>handleCheck(i)}
                                key={i}
                                disabled={selected}
                            >
                                {i}
                            </button>
                        )

                }
            </div>
            <div className='controls'>
                <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    style={{width:185}}
                    href="/"
                    onClick={handleQuit}
                >
                    Quit
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    style={{width:185}}
                    onClick={handleNext}
                >
                    Next Question
                </Button>
            </div>
        </div>

    </div>
  )
}






