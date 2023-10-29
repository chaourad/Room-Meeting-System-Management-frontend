import { BrowserRouter, Outlet, Route,  Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Admin/Navbar";
import Dashboard from "./pages/Dashboard/Admin/Dashboard";
import Room from "./pages/Room/Room";
import Floor from "./pages/Floor/Floor";
import Reservation from "./pages/Reservation/Reservation";
import User from "./pages/User/User";
import DashboardEm from "./pages/Dashboard/Client/DashboardEm";
import NavbarEm from "./components/Navbar/Client/NavBarEm";
import { ToastContainer } from "react-toastify";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
const LayoutEm = () => {
  return (
    <div>
      <NavbarEm />
      <Outlet />
    </div>
  );
};
export default function App() {
  return (
<>
<ToastContainer />

    <BrowserRouter>
      <Routes>
      <Route index element={<Login />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="room" element={<Room />} />
          <Route path="floor" element={<Floor />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="users" element={<User />} />

        </Route>
        <Route path="/employee" element={<LayoutEm />}>
          <Route path="dashboard" element={<DashboardEm />} />
         

        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}
