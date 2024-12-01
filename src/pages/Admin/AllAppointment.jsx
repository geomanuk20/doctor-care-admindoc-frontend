import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments().catch(error => {
        console.error("Failed to fetch appointments:", error);
      });
    }
  }, [aToken, getAllAppointments]);

  if (!appointments) {
    return <div>Loading...</div>;
  }

  return (
    <><div className="m-5 w-full max-h-[90vh] overflow-y-scroll hidden lg:block md:block sm:block xl:block">
      <div className="w-full max-w-6xl">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_3fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-100">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Department</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_3fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="hidden sm:block">{index + 1}</p>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <img className="w-8 rounded-full" src={item.userData?.image} alt={item.userData?.name} />
                  <p>{item.userData?.name}</p>
                </div>
                <p className="hidden sm:block">{item.userData ? calculateAge(item.userData.dob) : "N/A"}</p>
                <p className="col-span-2 sm:col-span-1">{item.docData.speciality}</p>
                <p className="col-span-3 sm:col-span-1">{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <img className="w-8 rounded-full bg-gray-200" src={item.docData?.image} alt={item.docData?.name} />
                  <p>{item.docData?.name}</p>
                </div>
                <p>₹{item.docData.fees}</p>
                <div className="flex items-center justify-center">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">cancelled</p>
                  ) : (
                    <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="Cancel" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No appointments found</div>
          )}
        </div>
      </div>
    </div><div className="m-5 w-full max-h-[90vh] overflow-y-scroll sm:hidden md:hidden lg:hidden">
  <div className="w-full max-w-6xl">
    <p className="mb-3 text-lg font-medium">All Appointments</p>
    <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
      {appointments.length > 0 ? (
        appointments.map((item, index) => (
          <div
            className="flex flex-col sm:flex-row sm:items-center text-gray-500 py-3 px-4 border-b hover:bg-gray-50"
            key={index}
          >
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-0 sm:mr-4">
              <img className="w-8 rounded-full" src={item.userData?.image} alt="Patient" />
            </div>
            <div className="flex flex-col sm:flex-1 items-center justify-center">
              <p className="text-sm font-medium">
                Patient: <span className="font-normal">{item.userData?.name || "N/A"}</span>
              </p>
              <p className="text-sm">
                Age: <span className="font-normal">{item.userData ? calculateAge(item.userData.dob) : "N/A"}</span>
              </p>
              <p className="text-sm">
                Doctor: <span className="font-normal">{item.docData?.name || "N/A"}</span>
              </p>
              <p className="text-sm">
                Date & Time: <span className="font-normal">{`${slotDateFormat(item.slotDate)}, ${item.slotTime}`}</span>
              </p>
              <p className="text-sm text-red-400">{item.cancelled && "Cancelled"}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No appointments found</div>
      )}
    </div>
  </div>
</div>
</>
  );
};

export default AllAppointment;
