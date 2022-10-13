import {
    Box,
    Button,
    Divider,
    HStack,
    LightMode,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "c381f4916ff6ebcec7174e652dc63b22",
        redirect_uri: "http://localhost:3000/social/kakao",
        response_type: "code",
        scope: "account_email",
    };
    const kakaoParamsString = new URLSearchParams(kakaoParams).toString();
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text
                    textTransform={"uppercase"}
                    color={"gray.500"}
                    fontSize={"Xs"}
                    as={"b"}
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <LightMode>
                    <Button
                        as="a"
                        href="https://github.com/login/oauth/authorize?client_id=2950d79e11946043b597&scope=read:user user:email"
                        w="full"
                        leftIcon={<FaGithub />}
                        colorScheme={"blackAlpha"}
                        bg={"blackAlpha.700"}
                    >
                        Continue with Github
                    </Button>
                </LightMode>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamsString}`}
                    w="full"
                    leftIcon={<FaComment />}
                    colorScheme={"yellow"}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
