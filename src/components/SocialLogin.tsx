import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
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
        <Button
          w="full"
          leftIcon={<FaGithub />}
          colorScheme={"blackAlpha"}
          bg={"blackAlpha.700"}
        >
          Continue with Github
        </Button>
        <Button w="full" leftIcon={<FaComment />} colorScheme={"yellow"}>
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
