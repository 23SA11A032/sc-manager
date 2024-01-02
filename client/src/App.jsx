import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Protect from "./components/Protect";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Protect />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
