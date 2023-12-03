import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserListing from './UserListing';
import UserCreate from './UserCreate';
import UserDetail from './UserDetail';
import UserEdit from './UserEdit';

function App() {
  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserListing />}></Route>
          <Route path='/user/create' element={<UserCreate />}></Route>

          <Route path='/user/detail/:userid' element={<UserDetail />}></Route>
          <Route path='/user/edit/:userid' element={<UserEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;