import {
    Box,
    Button,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaLock, FaMoon, FaUserNinja } from "react-icons/fa";

export default function Root() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Box>
            <HStack
                px={10}
                py={5}
                borderBottomWidth={1}
                justifyContent={"space-between"}
            >
                <Box color="red.500" fontSize="48">
                    <FaAirbnb />
                </Box>
                <HStack spacing={2}>
                    <IconButton
                        variant={"ghost"}
                        aria-label="Toggle dark mode"
                        icon={<FaMoon />}
                    />
                    <Button onClick={onOpen}>Log in</Button>
                    <Button colorScheme={"red"}>Sign up</Button>
                </HStack>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color={"gray.500"}>
                                            <FaUserNinja />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Username"
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaLock />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                            <Button mt={4} colorScheme={"red"} w="100%">
                                Log in
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Outlet />
        </Box>
    );
}
