import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register.js';
import UserList from './Pages/UserList.js';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        
          <Route path="login"  element={<Login />} />
          <Route index  element={<Register />} />
          <Route path="users" element={<UserList />} />
         
          
       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
