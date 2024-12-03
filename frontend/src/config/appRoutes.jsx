// AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Onboarding from '../pages/onboarding';
import LandingPage from '../pages/landingPage';
import InitializeBot from '../pages/initializeBot';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/'  element={<LandingPage/>}/>
      <Route path="/onboarding/login" element={<div><Onboarding /></div>} />
      <Route path="/onboarding/register" element={<Onboarding />} />
      <Route path='/initialize' element={<InitializeBot/>}/>
    </Routes>
  );
}

export default AppRoutes;
