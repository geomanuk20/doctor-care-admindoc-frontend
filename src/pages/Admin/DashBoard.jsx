import { useContext, useEffect} from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DashBoard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const {slotDateFormat} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  return dashData && (
    <div className="w-full m-5 ">
      <div className="m-5 ">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center justify-center gap-2 bg-white p-4 min-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all w-full sm:w-auto">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600 ">{dashData.doctors}</p>
            <p className="text-gray-400">doctors</p>
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
                <img className="w-8 h-8 rounded-full" src={item.docData.image} alt="Doctor" />
                <div>
                  <p className="text-sm font-medium">{item.docData.name}</p>
                  <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">cancelled</p>
              ) : (
                <img onClick={() => cancelAppointment(item._id)} className="w-6 h-6 cursor-pointer" src={assets.cancel_icon} alt="Cancel" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashBoard;
