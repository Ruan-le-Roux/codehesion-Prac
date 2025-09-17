import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Words from './Words'
import UpdateUser from './UpdateUser'
import Tags from './Tags'
import CreateTag from './CreateTag'
import EditTag from './EditTag'
import AllWords from './AllWords'
import AddToCategory from './AddToCategory'

function App ()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/words/:id" element={<Words/>}/>
                <Route path="/updateUser" element={<UpdateUser/>}/>
                <Route path="/tags" element={<Tags/>}/>
                <Route path="/tags/create" element={<CreateTag/>}/>
                <Route path="/tags/edit/:id" element={<EditTag/>}/>
                <Route path="/category" element={<AllWords/>}/>
                <Route path="/category/:wordId" element={<AddToCategory/>}/>
            </Routes>
        </Router>
    );
}

export default App;