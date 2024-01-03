import {
    Box,
    Button,
    Center,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Spinner,
    Text,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../lib/api";
import Logout from "../components/Logout";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scripts, setScripts] = useState([]);
    const [selected, setSelected] = useState();
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoadingData(true);
            var { data } = await api.get("/api/scripts/?name=true&id=true");
            setScripts([...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingData(false);
        }
    };

    const handleSelect = async (id) => {
        try {
            var { data } = await api.get("/api/scripts/" + id);
            setSelected({ ...data });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        try {
            setLoadingSave(true);
            var body = { ...selected };
            delete body.id;
            var { data } = await api.put("/api/scripts/" + selected.id, body);
            toast({ title: "Sukses", description: "Sukses menyimpan data", status: "success", isClosable: true, position: "top-right" });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Error menyimpan data", status: "error", isClosable: true, position: "top-right" });
        } finally {
            setLoadingSave(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoadingDelete(true);
            await api.delete("/api/scripts/" + selected.id);
            await loadData();
            toast({ title: "Sukses", description: "Sukses menghapus data", status: "success", isClosable: true, position: "top-right" });
            setIsDeleteOpen(false);
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Error menghapus data", status: "error", isClosable: true, position: "top-right" });
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <>
            <Container display={"flex"} flexDir={"column"} mx={"auto"} maxW={"container.xl"} py={4} gap={4} h={"100vh"} minH={"100vh"}>
                <Flex flexDir={"row"} gap={4} alignItems={"center"}>
                    <Button colorScheme="blue" onClick={onOpen}>
                        Open
                    </Button>
                    {selected && (
                        <Button colorScheme="green" isLoading={loadingSave} onClick={handleSave}>
                            Save
                        </Button>
                    )}
                    {selected && <Delete isOpen={isDeleteOpen} onOpen={() => setIsDeleteOpen(true)} onClose={() => setIsDeleteOpen(false)} onDelete={handleDelete} isLoading={loadingDelete} />}
                    <Add onDone={loadData} />
                    <Spacer />
                    <Logout colorScheme={"red"} />
                </Flex>
                {selected && <Heading>{selected?.name}</Heading>}
                {selected && (
                    <Textarea
                        fontFamily={"monospace"}
                        w={"100%"}
                        maxH={"60%"}
                        height={"100%"}
                        value={selected?.value}
                        onChange={(e) =>
                            setSelected((p) => {
                                p.value = e.target.value;
                                return { ...p };
                            })
                        }
                    />
                )}
                {selected && (
                    <a href={"/api/raw/" + selected.name} target="_blank">
                        <Button variant={"outline"} w={"fit-content"}>
                            Raw
                        </Button>
                    </a>
                )}
            </Container>

            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">LIST SCRIPT</DrawerHeader>
                    <DrawerBody display={"flex"} flexDir={"column"} gap={1} p={0}>
                        {scripts.map((v, i) => {
                            return (
                                <Button rounded={0} key={i} variant={selected?.id == v.id ? "outline" : "ghost"} colorScheme={selected?.id == v.id ? "blue" : null} w={"100%"} onClick={() => handleSelect(v.id)}>
                                    {v.name}
                                </Button>
                            );
                        })}
                        {loadingData && (
                            <Center p={4}>
                                <Spinner />
                            </Center>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

function Delete({ onDelete, isLoading, isOpen, onOpen, onClose }) {
    return (
        <>
            <Button onClick={onOpen} colorScheme="pink">
                Delete
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={["sm", "md"]}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Apakah Anda yakin?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Konfirmasi penghapusan ini tidak dapat dibatalkan. Apakah Anda yakin ingin melanjutkan penghapusan data?</Text>
                    </ModalBody>
                    <ModalFooter display={"flex"} flexDir={"row"} alignItems={"center"} gap={4}>
                        <Button onClick={onDelete} isLoading={isLoading} colorScheme="pink">
                            Delete
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function Add({ onDone }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({ name: "", value: "" });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleAdd = async () => {
        try {
            setLoading(true);
            await api.post("/api/scripts", data);
            (() => {
                onDone();
                onClose();
            })();
            toast({ title: "Sukses", description: "Sukses menambah data", status: "success", isClosable: true, position: "top-right" });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Error menambah data", status: "error", isClosable: true, position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setData((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="yellow">
                Add
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size={["sm", "md"]}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Script</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={data.name} onChange={handleChange} />
                        </FormControl>
                        <FormControl pt={4}>
                            <FormLabel>Value</FormLabel>
                            <Textarea fontFamily={"monospace"} name="value" value={data.value} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter display={"flex"} flexDir={"row"} alignItems={"center"} gap={4}>
                        <Button onClick={handleAdd} isLoading={loading} colorScheme="blue">
                            Add
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
