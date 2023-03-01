import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Main} from './pages/main';
import {Login} from './pages/login';
import {NavBar} from './components/navbar';
import {CreatePost} from './pages/create-post/createpost'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
