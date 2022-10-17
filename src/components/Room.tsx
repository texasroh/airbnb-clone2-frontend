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
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface RoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: RoomProps) {
  const gray = useColorModeValue("gray.600", "gray.200");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          w="full"
          position={"relative"}
          rounded={"3xl"}
          mb={2}
          overflow={"hidden"}
        >
          <Image minH="280" src={imageUrl} objectFit={"cover"} />
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            onClick={onCameraClick}
            color="white"
          >
            {isOwner ? <FaCamera size={20} /> : <FaRegHeart size={20} />}
          </Button>
        </Box>
        <Box w="full">
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack
              _hover={{
                color: "red.100",
              }}
              spacing={1}
            >
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">${price}</Text> night
        </Text>
      </VStack>
    </Link>
  );
}
