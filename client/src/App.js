import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import HomePage from './components/Home/HomePage';
import './index.css'
import ProfilePage from './components/Profile/ProfilePage';
import ProfileEditForm from './components/Profile/ProfileEditForm';
import DateSetupForm from "./components/DateSetUp/DateSetupForm"
import DateDetailPage from './components/DateDetails/DateDetailPage';
import LandingPage from './components/Authentication/LandingPage';
import SignIn from './components/Authentication/Sign-in';
import SignUp from './components/Authentication/Sign-up';
import ContactUs from './components/Contact/ContactUs';
import CreateProfile from './components/Authentication/CreateProfile';
import TermsOfService from './components/Terms/TermsPage';
import OtpVerification from './components/Authentication/OtpVerification';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppContent = () => {
  const location = useLocation();
  const isExcludedPage = ['/','/sign-in', '/sign-up', '/create-profile', '/verifyOtp'].includes(location.pathname);

  return (
    <div className="app">
      {!isExcludedPage && <Header />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-profile" element={<ProfileEditForm />} />
          <Route path="/date-setup" element={<DateSetupForm/>} />
          <Route path="/date/:dateId" element={<DateDetailPage />} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/create-profile" element={<CreateProfile/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/terms" element={<TermsOfService/>} />
          <Route path="/verify-otp" element={<OtpVerification/>}/>
        </Routes>
      </main>
      {!isExcludedPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
