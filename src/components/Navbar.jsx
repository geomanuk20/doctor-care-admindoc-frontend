import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const {dToken,setDToken} = useContext(DoctorContext)
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) {
      setAtoken(''); 
      localStorage.removeItem('aToken');
    }else{
      setDToken('')
      localStorage.removeItem('dToken')
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-16 cursor-pointer" src={assets.admin_logo} alt="Admin Logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{aToken ? 'Admin' : 'Doctor'}</p>
      </div >
      <div className="flex items-center gap-3 justify-end w-full md:w-auto">
        <button onClick={logout} className="bg-primary text-white text-sm px-4 py-2 rounded-full md:px-10"> Logout </button>
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu Icon" />
      </div>

      <div className={`${showMenu ? 'fixed w-2/3' : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-slate-200 transition-none`}>
      <div className="flex items-center justify-between px-5 py-6 ">
          <img className="w-auto h-24" src={assets.admin_logo} alt="Logo"/>
          <img className="w-7 transition-colors" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Menu" />
      </div>
      {
        aToken &&
        <ul className="flex flex-col items-center gap-5 mt-10 px-5 text-lg font-medium">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive ? "text-primary border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/all-appointment"
              className={({ isActive }) =>
                isActive ? "text-primary  border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>ALL Appointment</li>
            </NavLink>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                isActive ? "text-primary  border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>Add Doctor</li>
            </NavLink>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                isActive ? "text-primary  border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>Doctor List</li>
            </NavLink>
          </ul>
      }
      {
        dToken &&
        <ul className="flex flex-col items-center gap-5 mt-10 px-5 text-lg font-medium">
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                isActive ? "text-primary border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                isActive ? "text-primary  border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>ALL Appointment</li>
            </NavLink>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                isActive ? "text-primary  border-primary " : "hover:text-primary"
              }
              onClick={() => setShowMenu(false)}
            >
              <li>profile</li>
            </NavLink>
          </ul>
      }
          <div className=" justify-items-center px-5 pt-36">
            <p>admin&copy;Doctorcare.com</p>
            <p className="font-thin text-sm">version 0.01</p>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
