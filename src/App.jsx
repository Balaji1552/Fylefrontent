import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom"
import AddWorkout from "./compoents/AddWorkout"
import WorkoutList from "./compoents/WorkoutList"
import WorkoutProgress from "./compoents/WorkoutProgress"
import Header from './compoents/Header.jsx'



function App() {
  

  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<WorkoutList/> }></Route>
      <Route path='/add-workout' element={<AddWorkout/>}></Route>
      <Route path='/workprogress'  element={<WorkoutProgress/>}></Route>

    </Routes>
     
 
    </BrowserRouter>
     
    </>
  
  )
}

export default App
