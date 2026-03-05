import './App.css'
import Navbar from './components/navbar/Navbar';
import EmployeeForm from './pages/form/Form'
import Info from "./pages/info/Info"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <div style={{padding: "2rem"}}>
    <Routes>
      <Route path='/' element={<Info/>}/>
      <Route path='/employees/new' element={<EmployeeForm/>}/>
      <Route path='/employees/edit/:id' element={<EmployeeForm/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App