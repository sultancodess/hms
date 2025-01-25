import React,{useState, useEffect} from "react";
import axios from "axios";
import Avatar from "react-avatar";

const ProfilePage = () => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
  


    useEffect(() => {
      const fetchUser = async () => {
        try {

            const headers = {
              id: localStorage.getItem("id"),
              authorization: `Bearer ${localStorage.getItem("token")}`,
            };
          const response = await axios.get(
            `http://localhost:1000/api/v1/get-user-information`,
            { headers }
          );
          setUser(response.data.data);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, []);

  const DOB = user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "N/A";



  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex gap-6">
          <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6 bg-blue-100 p-3 border-l-4 border-blue-500 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar
                  name={user?.name}
                  src={user?.avatarURL}
                  round={true}
                  size="80"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Edit Profile
              </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4  bg-orange-100 p-3 border-l-4 border-orange-500 rounded-lg text-blue-500">
              All Personal Informations
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6  bg-green-100 p-3 border-l-4 border-green-500 rounded-lg">
              <div>
                <p className="text-gray-500">Email Address</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Mobile Number</p>
                <p>{user?.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Date of Birth</p>
                <p>{DOB}</p>
              </div>
              <div>
                <p className="text-gray-500">Age</p>
                <p>{user?.age}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p>
                  {user?.street} {user?.city} {user?.postalCode} {user?.state}{" "}
                  {user?.country}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p>{user?.weight}</p>
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Medical History</h3>
              <div className="flex items-center justify-between mb-4">
                <p>Prescription #1</p>
                <span className="text-blue-500">Date-17-11-24</span>
              </div>
              <div className="flex items-center justify-between">
                <p>Prescription #2</p>
                <span className="text-blue-500">Date-17-11-24</span>
              </div>
              <button className="bg-blue-500 text-white w-full mt-4 py-2 rounded-lg">
                Show All
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Queue status</h3>
              <select className="w-full border rounded-lg p-2">
                <option>Waiting</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Health Report</h3>
              <button className="bg-blue-500 text-white w-full py-2 rounded-lg">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default ProfilePage;
