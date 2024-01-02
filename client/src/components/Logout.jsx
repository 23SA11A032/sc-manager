import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {import("@chakra-ui/react").ButtonProps} options
 * @returns
 */
export default function Logout(options) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <>
            <Button {...options} onClick={handleLogout}>
                Logout
            </Button>
        </>
    );
}
