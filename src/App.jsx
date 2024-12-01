import { useContext } from "react";
import Login from "./pages/login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Admin/DashBoard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer/>
      <Navbar/>
      <div>
        <div className="flex items-start">
          <SideBar/>
          
          <Routes>
            <Route path="/" element={<></>}/>
            <Route path="/admin-dashboard" element={<DashBoard/>}/>
            <Route path="/all-appointment" element={<AllAppointment/>}/>
            <Route path="/add-doctor" element={<AddDoctor/>}/>      
            <Route path="/doctor-list" element={<DoctorsList/>}/>      
          </Routes>
          
        </div>
      </div>
    </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App