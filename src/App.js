import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Charities from "./pages/Charities";
import EditCharity from "./pages/EditCharity";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import NewCharity from "./pages/NewCharity";
import Users from "./pages/Users";
import Verified from "./pages/Verified";
import EditPassword from "./pages/EditPassword";
import EditInfo from "./pages/EditInfo";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/new-user/:userId' element={<Verified />} />
        <Route path='/user/edit-password/:userId' element={<EditPassword />} />
        <Route path='/user/edit-info/:userId' element={<EditInfo />} />
        <Route path='/user/forget-password/' element={<ForgetPassword />} />
        <Route path='/user/reset-password/:userId' element={<ResetPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/edit-charity/:charityId' element={<EditCharity />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/new-charity' element={<NewCharity />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
