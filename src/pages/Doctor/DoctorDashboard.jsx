import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"


const DoctorDashboard = () => {
  const {dToken,dashData,getDashData,completeAppointment,cancelAppointment} = useContext(DoctorContext)
  const {slotDateFormat} = useContext(AppContext)



  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken, getDashData])
  return dashData && (
    <div className="w-full">
      <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center justify-center gap-2 bg-white p-4 min-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full sm:w-auto">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600 ">₹{dashData.earnings}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-white p-4 min-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full sm:w-auto">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointment</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-white p-4 min-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full sm:w-auto">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white max-w-2xl">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Booking</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-6 py-3 hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="Doctor" />
                <div>
                  <p className="text-sm font-medium">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                </div>
              </div>
              {
                item.cancelled ?
                <p className="text-red-400 text-sm font-medium"> Cancelled</p>
                : item.isCompleted ?
                <p className="text-green-500 text-sm font-medium">Completed</p>
                :  <div className="flex">
                <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
              </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default DoctorDashboard