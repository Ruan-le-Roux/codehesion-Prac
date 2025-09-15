import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Words from './Words'

function App ()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/words/:id" element={<Words/>}/>
            </Routes>
        </Router>
    );
}

export default App;