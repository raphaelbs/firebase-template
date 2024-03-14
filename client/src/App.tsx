import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import LoginPage from "routes/Login/Login";
import { useFirebaseUser } from "services/auth";

const PrivateRoute = () => {
  const [user] = useFirebaseUser();

  if (user === undefined) return <></>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          {/* <FIX:Add authenticated pages here> */}
          {/* <Route path="/" element={<DashboardPage />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
