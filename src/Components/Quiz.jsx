import React, { useEffect, useState } from 'react'
import "./Quiz.css"
import { CircularProgress } from '@mui/material';
import { Question } from './Question';
export const Quiz = ({name,questions,score,setScore,setQuestions}) => {
    
    const[options,setOptions]=useState();
    const[currQues,setCurrQues]=useState(0);
    
    
    useEffect(()=>{ 
        setOptions(questions && 
            handleSuffle([questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers])
        );    
    },[questions,currQues]);    
    console.log(options);
    
    const handleSuffle=(optionss)=>{
        return optionss.sort(()=>Math.random()-0.5);
    }
    return (
    <div className='quiz'>
        <span className='subtitle'>Welcome, {name}</span>
    {questions?
    (<>
        <div className='quizInfo'>
            <span style={{color:"blue",fontStyle:"bold"}}>{questions[currQues].category}</span>
            <span style={{color:"green", fontStyle:"bold"}}>Score: {score}</span>
        </div>

        <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues].correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
        />

    </>
    ):
    <CircularProgress
    style={{
    margin: '100px',
    color: 'green',  
    width: 150,
    height: 150,
    borderWidth: 1, 
    }}
    />
    }
   
    </div>
  )
}
