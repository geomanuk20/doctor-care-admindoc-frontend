import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctor,setDoctors] = useState([])
    const [appointments,setAppointments] =useState([])
    const [dashData,setDashdata] =useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
            
            if (data.success) {
                setDoctors(data.doctor);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) =>{
        try {
            const {data} =  await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const getAllAppointments = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
            headers: { aToken },
          });
    
          if (data.success) {
            setAppointments(data.appointments);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
          console.error(error);
        }
      };

      const cancelAppointment = async(appointmentId)=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/cancel-appointments`,{appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
      }


      const getDashData = async()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`,{headers:{aToken}})
            if(data.success){
                setDashdata(data.dashData)
                console.log(data.dashData)                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
      }
    const value = {
        aToken,
        setAtoken,
        backendUrl,
        doctor,
        getAllDoctors,
        changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData,

    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

AdminContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminContextProvider;
