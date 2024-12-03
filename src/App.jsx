import { useContext } from "react";
import Login from "./pages/Login.jsx"
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
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer/>
      <Navbar/>
      <div>
        <div className="flex items-start">
          <SideBar/>
          
          <Routes>
            {/*Admin Route */}
            <Route path="/" element={<></>}/>
            <Route path="/admin-dashboard" element={<DashBoard/>}/>
            <Route path="/all-appointment" element={<AllAppointment/>}/>
            <Route path="/add-doctor" element={<AddDoctor/>}/>      
            <Route path="/doctor-list" element={<DoctorsList/>}/> 

            {/*Doctor Route */}    
            <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>     
            <Route path="/doctor-appointments" element={<DoctorAppointment/>}/>   
            <Route path="/doctor-profile" element={<DoctorProfile/>}/>   
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