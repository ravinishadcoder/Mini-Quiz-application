import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home2 from './pages/Home2';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
     <Home/>
     <Routes>
      <Route path='/' element={<Home2/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
      <Route path='/user' element={<UserPanel/>}/>
     </Routes>
    </div>
  );
}

export default App;


