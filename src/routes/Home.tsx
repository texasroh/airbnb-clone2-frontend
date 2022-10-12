import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr", //phone
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton height={280} rounded={"2xl"} mb={7} />
        <SkeletonText noOfLines={2} w={"50%"} mb={7} />
        <SkeletonText noOfLines={1} w={"20%"} />
      </Box>
      <Room />
    </Grid>
  );
}
