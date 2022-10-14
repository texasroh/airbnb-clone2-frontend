import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { usernameLogIn } from "../api";
import {
    IUsernameLoginError,
    IUsernameLoginSuccess,
    IUsernameLoginVariables,
} from "../types";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    // const usernameRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);
    // const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   console.log(usernameRef.current?.value);
    // };
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<IUsernameLoginVariables>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameLoginVariables
    >(usernameLogIn, {
        onSuccess: (data) => {
            toast({
                title: "Welcome!",
                status: "success",
                position: "top",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
        onError: (error) => {
            // toast({
            //     title: "Error",
            //     description: "Wrong username or password.",
            //     status: "error",
            //     position: "top",
            // });
        },
    });
    const onSubmit = (data: IUsernameLoginVariables) => {
        mutation.mutate(data);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
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
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "username is required",
                                })}
                                required
                                variant={"filled"}
                                placeholder="Username"
                            />
                            <Text fontSize={"sm"} color="red.500">
                                {errors.username?.message}
                            </Text>
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
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", { required: true })}
                                required
                                variant={"filled"}
                                placeholder="Password"
                                type="password"
                            />
                            <Text fontSize={"sm"} color="red.500">
                                {errors.password?.message}
                            </Text>
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? (
                        <Text
                            color="red.500"
                            textAlign={"center"}
                            fontSize="sm"
                        >
                            Username or Password are wrong
                        </Text>
                    ) : null}
                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        mt={4}
                        colorScheme={"red"}
                        w="100%"
                    >
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
