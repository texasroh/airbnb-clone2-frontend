import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    ToastId,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { isUserLoading, isLoggedIn, user } = useUser();
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
    const toast = useToast();
    const queryClient = useQueryClient();
    const toastId = useRef<ToastId>();
    const mutation = useMutation(logOut, {
        onMutate: () => {
            toastId.current = toast({
                title: "Login out...",
                description: "Sad to see you go...",
                status: "loading",
                position: "top",
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries(["me"]);
            if (toastId.current) {
                toast.update(toastId.current, {
                    title: "Good Bye",
                    description: "See you later",
                    status: "success",
                });
            }
        },
    });
    const onLogOut = () => {
        mutation.mutate();
    };
    // const onLogOut = async () => {
    //     const toastId = toast({
    //         title: "Login out...",
    //         description: "Sad to see you go...",
    //         status: "loading",
    //         position: "top",
    //     });
    //     await logOut();
    //     queryClient.refetchQueries(["me"]);
    //     toast.update(toastId, {
    //         title: "Good Bye",
    //         description: "See you later",
    //         status: "success",
    //     });
    // };
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
                {!isUserLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button
                                    onClick={onSignUpOpen}
                                    colorScheme={"red"}
                                >
                                    Sign up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    name={user?.name}
                                    src={user?.avatar}
                                    size={"md"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
