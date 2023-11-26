import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Customer from './Customer'
import CreateCustomer from './CreateCustomer';
import UpdateCustomer from './UpdateCustomer';
import "bootstrap/dist/css/bootstrap.min.css"
import SearchCustomer from './SearchCustomer';
import Register from './Register';
import Login from './Login';


function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Customer/>} />
      <Route path="/create" element={<CreateCustomer/>}></Route>
      <Route path="/update/:id" element={<UpdateCustomer/>}></Route>
      <Route path="/search" element={<SearchCustomer/>}></Route>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
