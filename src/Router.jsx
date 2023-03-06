import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default Router;
