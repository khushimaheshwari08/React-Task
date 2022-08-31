import './App.css';
import Dashboard from './components/dashboard';
import LogIn from './components/logIn';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  return (
      <BrowserRouter>
      <Routes>
     <Route path='/' element={<LogIn/>} />
     <Route path='/dashBoard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
