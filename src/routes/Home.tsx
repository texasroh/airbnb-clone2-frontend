import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack alignItems={"flex-start"}>
        <Box rounded={"3xl"} mb={2} overflow={"hidden"}>
          <Image
            h="280"
            src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg"
          />
        </Box>
        <Box w="full">
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize="md">
              Mineral, Virginia, United States
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color="Gray.600">
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color="Gray.600">
          <Text as="b">$72</Text> night
        </Text>
      </VStack>
    </Grid>
  );
}
