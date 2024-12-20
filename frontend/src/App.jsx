import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInSide from './components/Auth/SignInSide.jsx';
import SignUpSide from './components/Auth/SignUpSide.jsx';
import SignOut from './components/Auth/SignOut.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import DefaultComponent from './components/Dashboard/Dashboard.jsx';
import VitalSignSimulator from './components/VitalSignSimulator/index.jsx';
import Reports from './components/Reports/index.jsx';
import Patients from './components/Patients/index.jsx';
import Users from './components/Users/index.jsx';
import Alerts from './components/Alerts/index.jsx';
import UpdateProfile from './components/UpdateProfile/index.jsx';
import Profile from './components/Profile/index.jsx';
import NotFound from './components/NotFound/index.jsx';
import HelpfulResources from './components/HelpfulResources/index.jsx';
import Questions from './components/Questions/index.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DefaultComponent />} /> 
          <Route path="vital-sign-simulator" element={<VitalSignSimulator />} />
          <Route path="*" element={<NotFound />} />
          <Route path="patients" element={<Patients />} />
          <Route path="update/profile" element={<UpdateProfile />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="helpful-resources" element={<HelpfulResources />} />
          <Route path="questions" element={<Questions />} />
        </Route>
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUpSide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
