import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            const status = await githubLogIn(code);
            if (status === 200) {
                toast({
                    title: "Welcome!",
                    status: "success",
                    position: "top",
                });
                queryClient.refetchQueries(["me"]);
                navigate("/");
                // return;
            }
        }
        console.log("hello");
        toast({
            title: "Github Login Fail",
            status: "error",
            position: "top",
        });
    };
    useEffect(() => {
        confirmLogin();
    }, []);
    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>Processing log in...</Heading>
            <Text>Don't go anywhere.</Text>
            <Spinner size="lg" />
        </VStack>
    );
}
