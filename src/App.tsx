import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import {Main} from './pages/main';
import {Login} from './pages/login';
import {NavBar} from './components/navbar';
import {CreatePost} from './pages/create-post/createpost';
import {Error} from './pages/error';
import { useState} from 'react'

interface ErrorInt {
  errorMsg: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}
export const ErrorContext = React.createContext<ErrorInt>({
  errorMsg: "",
  setErrorMsg: () => {}
});

function App() {
  const [errorMsg, setErrorMsg] = useState("We could not find that page!");
  return (
    <div className="App">
      <ErrorContext.Provider value={{errorMsg,setErrorMsg}}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<CreatePost/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
      </ErrorContext.Provider>
      <Outlet/>
    </div>
  );
}

export default App;
