import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Protect() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decode = jwtDecode(token);
            if (decode.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                navigate("/login");
            }
            return;
        }
        navigate("/login");
    }, []);

    return <Outlet />;
}
