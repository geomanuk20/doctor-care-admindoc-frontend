import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, backendUrl, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle update profile
  const updateProfile = async () => {
    try {
      const updateData = {
        address: editData.address,
        fees: editData.fees,
        available: editData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setProfileData(editData); // Update main profile data
        getProfileData(); // Optional: Refresh from backend
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  // Initialize editData when entering edit mode
  const handleEdit = () => {
    setEditData({ ...profileData }); // Create a copy of profileData
    setIsEdit(true);
  };

  // Cancel edit mode and revert changes
  const handleCancel = () => {
    setIsEdit(false);
    setEditData(null); // Discard edits
  };

  // Fetch profile data when dToken changes
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken, getProfileData]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-800">
                ₹
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={editData?.fees || ""}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={editData?.address.line1 || ""}
                    />
                    <br />
                    <input
                      type="text"
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={editData?.address.line2 || ""}
                    />
                  </>
                ) : (
                  <>
                    {profileData.address.line1}
                    <br />
                    {profileData.address.line2}
                  </>
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  isEdit &&
                  setEditData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
                checked={isEdit ? editData?.available : profileData?.available}
              />
              <label>Available</label>
            </div>

            {isEdit ? (
              <>
                <button
                  className="border border-primary px-6 py-1 rounded-full hover:bg-blue-500 hover:text-white"
                  onClick={updateProfile}
                >
                  Save
                </button>
                <button
                  className="border border-red-500 mx-2 px-6 py-1 rounded-full hover:bg-red-500 hover:text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="border border-primary px-6 py-1 rounded-full hover:bg-blue-500 hover:text-white"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
