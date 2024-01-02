import { Button, Card, CardBody, Center, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            var { data } = await axios.post("/api/auth/login", { username: user.username, password: user.password });
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChage = (e) => {
        setUser((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <Center minH={"100vh"} h={"100vh"} mx={"auto"}>
                <Card width={"fit-content"}>
                    <form onSubmit={handleSubmit}>
                        <CardBody display={"flex"} flexDirection={"column"}>
                            <Heading size={"xl"} alignSelf={"center"}>
                                Login
                            </Heading>
                            <FormControl isRequired pt={4}>
                                <FormLabel>Username</FormLabel>
                                <Input name="username" type="text" onChange={handleChage} />
                            </FormControl>
                            <FormControl isRequired pt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" type="password" onChange={handleChage} />
                            </FormControl>
                            <Button mt={4} isLoading={loading} type="submit" colorScheme="teal" bt={4} textAlign={"right"}>
                                Submit
                            </Button>
                        </CardBody>
                    </form>
                </Card>
            </Center>
        </>
    );
}
