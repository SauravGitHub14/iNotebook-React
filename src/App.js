
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from './components/Login';
import Signup from './components/Signup';
// import Logout from './components/Logout';
import { useState } from "react";
import {Toaster}  from 'react-hot-toast'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/notes/NoteState';

// const notify = () => toast.success("Here i your toast");

const App = () =>{
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="App">
      <div>
      <Toaster />
    </div>
    <NoteState>
      <Router>
       <Navbar isLoggedIn= {isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
       <Routes>
       <Route exact path='/' element ={<Home/>}></Route>
       <Route exact path='/home' element ={<Home/>}></Route>
       <Route exact path='/about' element ={<About/>}></Route>
       <Route exact path='/login' element ={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
       <Route exact path='/signup' element ={<Signup setIsLoggedIn={setIsLoggedIn}/>}></Route>
       {/* <Route exact path='/about' element ={<Logout/>}></Route> */}
       </Routes>
       </Router>
    </NoteState>
       
    </div>
  );
}

export default App;
