import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import TopNavbar from './components/Navbar/TopNavbar';
import AllDoctors from './pages/AllDoctors';
import BookAppointment from './pages/BookAppointment';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import DoctorProfile from './components/DoctorsProfile/DoctorProfile';
import BedOccupancy from './components/BedCheking/BedChecking';
import BedDetails from './components/BedDetails/BedDetails';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';
import { Toaster } from "react-hot-toast";
import PatientDashboard from './pages/PatientsDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from "./pages/DoctorDashboard";
import ForgetPassword from './components/Forgot Password/forgetPassword';
import ResetPassword from './components/Forgot Password/resetPassword';

function App() {

  const dispatch = useDispatch();
  // const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
    }
  },[dispatch])

  return (
    <div>
      <Toaster />

      <TopNavbar />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-doctors" element={<AllDoctors />} />

        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/check-bed-availability" element={<BedOccupancy />} />
        <Route
          path="/view-bed-details/:roomId/:bedId"
          element={<BedDetails />}
        />
        <Route path="/view-doctor-details/:id" element={<DoctorProfile />} />

        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
