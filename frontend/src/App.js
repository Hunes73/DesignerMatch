import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import Head from './components/header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { SignIn } from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import { RequireAuth } from './components/RequireAuth';
import UserPage from './pages/Profile/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditUserPageMobile from './pages/Profile/EditUserPageMobile';
import Modal from './components/ModalA';
import Chat from './pages/Chat/Chat';
import CompanyPage from './pages/Profile/CompanyPage';
import EditCompanyPage from './pages/Profile/EditCompanyPage';
import OtherUserPage from './pages/Profile/OtherProfile';
import Commissions from './pages/Home/Commissions';
import { AllPage, HeroContainer } from './pages/Home/Styles';
import axios from './api/axios';
import OtherCompanyPage from './pages/Profile/OtherCompanyPage';
import ConfirmEmail from './pages/404/ConfirmEmail';
import Code404 from './pages/404/Code404';

function App() {
  const [role, setRole] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('storageLogin');
      if (token) {
        const decodeResult = await axios.request('/auth/decodeToken', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        console.log(decodeResult.data.role);
        setRole(decodeResult.data.role);
      } else {
        console.log('localStorage.getItem("storageLogin") is empty');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignIn = () => {
    fetchData();
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Head />
        {/* <Alarm /> */}

        <Routes>
          {role && (
            <>
              <Route
                path="/account"
                element={
                  <RequireAuth>
                    {' '}
                    {role === 'ARTIST' ? <UserPage /> : null}
                    {role === 'COMPANY' ? <CompanyPage /> : null}{' '}
                  </RequireAuth>
                }
              />
              <Route
                path="/accountEdit"
                element={
                  <RequireAuth>
                    {' '}
                    {role === 'ARTIST' ? <EditUserPageMobile /> : null}
                    {role === 'COMPANY' ? <EditCompanyPage /> : null}{' '}
                  </RequireAuth>
                }
              />
            </>
          )}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/other-company/:argument" element={<OtherCompanyPage />} />
          <Route path="/other-account/:argument" element={<OtherUserPage />} />
          <Route
            path="/sign-in"
            element={
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                {' '}
                <SignIn onSignIn={handleSignIn} />{' '}
              </GoogleOAuthProvider>
            }
          />
          <Route
            path="/sign-up"
            element={
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                {' '}
                <SignUp />{' '}
              </GoogleOAuthProvider>
            }
          />
          <Route path="/test" element={<EditUserPageMobile />} />
          <Route
            path="/chat"
            element={
              <RequireAuth>
                {' '}
                <Chat />{' '}
              </RequireAuth>
            }
          />
          <Route path="/1" element={<Modal />} />
          <Route
            path="/commissions"
            element={
              <>
                <AllPage>
                  <HeroContainer>
                    <Commissions />
                  </HeroContainer>
                </AllPage>
              </>
            }
          />
          <Route path="/confirm" element={<ConfirmEmail />} />
          <Route path="*" element={<Code404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
