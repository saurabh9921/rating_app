import logo from './logo.svg';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './component/AddUser';
import ViewUsers from './component/ViewUsers';
import AddStore from './component/AddStore';
import ViewStore from './component/ViewStore';
import UserLogin from './component/UserLogin';
import SignUp from './component/SignUp';
import RoleBasedLayout from './component/RoleBasedLayout';
import MultiStoreRatingPage from './component/MultiStoreRatingPage';
import UpdatePassword from './component/UpdatePassword';
function App() {
  return (
    <>
      
      <Router>
          <Routes>
              <Route path='/' element={<UserLogin/>}/> 
              <Route path='/addUser' element={<AddUser/>}/>/
              <Route path='/viewUser' element={<ViewUsers/>}/>
              <Route path='/addStore' element={<AddStore/>}/>  
              <Route path='/viewStore' element={<ViewStore/>}/>  
              <Route path='/signUp' element={<SignUp/>}/> 
               <Route path='/dashBoard' element={<AdminDashboard/>}/> 

               <Route path='/roleBasedLayout' element={<RoleBasedLayout/>}/> 
               <Route path='/rateStore' element={<MultiStoreRatingPage/>}/> 
               <Route path='/updatePass' element={<UpdatePassword/>}/> 
          </Routes>
      </Router>
    </>
   
     
 
  );
}

export default App;
