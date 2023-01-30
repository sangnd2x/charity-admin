import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Charities from "./pages/Charities";
import EditCharity from "./pages/EditCharity";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import NewCharity from "./pages/NewCharity";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/edit-charity' element={<EditCharity />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/new-charity' element={<NewCharity />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
