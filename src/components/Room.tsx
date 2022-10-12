import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.200");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} rounded={"3xl"} mb={2} overflow={"hidden"}>
        <Image
          minH="280"
          src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg"
        />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart size={20} />
        </Button>
      </Box>
      <Box w="full">
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text as="b" noOfLines={1} fontSize="md">
            Mineral, Virginia, United States
          </Text>
          <HStack
            _hover={{
              color: "red.100",
            }}
            spacing={1}
          >
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={"sm"} color={gray}>
        <Text as="b">$72</Text> night
      </Text>
    </VStack>
  );
}
