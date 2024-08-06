import axios from "axios"
import './App.css';
import { Header } from './Components/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './Components/Home';
import { Quiz } from './Components/Quiz';
import { Result } from './Components/Result';
import { useState } from 'react';
function App() {

  const[name,setName] =useState("");
  const[score,setScore]=useState(0);
  const[questions,setQuestions]=useState();
   const fetchQuestions=async({category="",difficulty=""})=>{
    const {data}=await axios.get(`
      https://opentdb.com/api.php?amount=10
      ${category && `&category=${category}`}
      ${difficulty && `&difficulty=${difficulty}`}
      &type=multiple
      `);
     
      setQuestions(data.results)
  }
  return (
  <div className='app'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={
        <Home
          name={name}
          setName={setName}
          fetchQuestions={fetchQuestions}
        />
      }/>
        <Route path='/Quiz' element={
          <Quiz
            name={name}
            questions={questions}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />}/>
        <Route path='/Result' element={<Result name={name} score={score}/>}/>
      </Routes>
    </BrowserRouter>
  </div>
    
  );
}

export default App;
