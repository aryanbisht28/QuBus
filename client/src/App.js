// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/Login";
import User from "./views/User/Index";
import QBoxStatusAdmin from "./views/Admin/QBoxStatus/index";
import DashboardAdmin from "./views/Admin/Dashboard/index"
import CreateUserAdmin from "./views/Admin/CreateUser/index"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/admin" element={<DashboardAdmin/>} />
          <Route path="/user" element={<User />} />
          <Route path="/admin/QBox-status" element={<QBoxStatusAdmin />} />
          <Route path="/admin/create-user" element={<CreateUserAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
