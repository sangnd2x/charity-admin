import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import NewCharity from "./pages/NewCharity";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/new-charity' element={<NewCharity />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
