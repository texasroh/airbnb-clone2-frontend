import {
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    return (
        <Stack
            px={40}
            py={5}
            alignItems={"center"}
            borderBottomWidth={1}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 4,
                md: 0,
            }}
            justifyContent={"space-between"}
        >
            <Box color={logoColor} fontSize="48">
                <Link to="/">
                    <FaAirbnb />
                </Link>
            </Box>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<Icon />}
                />
                <Button onClick={onLoginOpen}>Log in</Button>
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>
                        Sign up
                    </Button>
                </LightMode>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
