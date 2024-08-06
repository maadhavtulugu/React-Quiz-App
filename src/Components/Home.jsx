import React, { useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField'
import Categories, {} from './Categories'
import { Button, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from './ErrorMessage'

export const Home = ({name,setName,fetchQuestions}) => {

 const[category,setCategory]=useState("");
 const[difficulty,setDifficulty]=useState("");
 const[error,setError]=useState(false); 
 const navigate=useNavigate();

  const handleSubmit=()=>{
    if(!category || !difficulty || !name){
        setError(true);
        return;
    }
    else{
        setError(false);
        fetchQuestions(category,difficulty);
        navigate('/quiz');
    }
  }  

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleName=(event)=>{
    setName(event.target.value);
  }
  return (
    <div className='content'>
        <div className='settings'>
        {error && <ErrorMessage>Please Fill All The Fields</ErrorMessage>}
        <TextField 
            label="Enter Your Name" 
            variant="outlined"
            style={{marginBottom:25}}
            onChange={handleName}
            value={name}
        />
        <TextField 
            select
            label="Select Category"
            variant='outlined'
            style={{marginBottom:30}}
            onChange={handleCategory}
            value={category}
        >
            {
                Categories.map((cat)=>(
                   <MenuItem key={cat.category} value={cat.value}>
                        {cat.category}
                   </MenuItem> 
                ))
            }
        </TextField>
        <TextField
            select
            label="Select difficulty"
            variant='outlined'
            style={{marginBottom:30}}
            onChange={handleDifficulty}
            value={difficulty}
        >
            <MenuItem key="Easy" value="easy">Easy</MenuItem>
            <MenuItem key="Medium" value="Medium">Medium</MenuItem>
            <MenuItem key="Hard" value="Hard">Hard</MenuItem>

        </TextField>
        <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>Start</Button>
        </div>
    </div>
  )
}
