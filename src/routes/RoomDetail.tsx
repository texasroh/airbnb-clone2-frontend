import {
    Avatar,
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data: room } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoom
    );

    const { isLoading: isReviewsLoading, data: reviews } = useQuery(
        ["rooms", roomPk, "reviews"],
        getRoomReviews
    );
    console.log(room);
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Skeleton isLoaded={!isLoading} h={10} width="25%">
                <Heading>{room?.name}</Heading>
            </Skeleton>
            <Grid
                mt={8}
                rounded={"xl"}
                overflow="hidden"
                gap={3}
                h="60vh"
                templateRows={"1fr 1fr"}
                templateColumns={"repeat(4, 1fr)"}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        key={index}
                    >
                        <Skeleton isLoaded={!isLoading} h="full" w="full">
                            <Image
                                src={room?.photos[index].file}
                                w="full"
                                h="full"
                                objectFit={"cover"}
                            />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <HStack w={"40%"} mt={10} justifyContent={"space-between"}>
                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading}>
                        <Heading fontSize={"2xl"}>
                            House hosted by {room?.owner.name}
                        </Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading}>
                        <HStack w="full">
                            <Text>
                                {room?.toilets}
                                toilet{room?.toilets === 1 ? "" : "s"}
                            </Text>
                            <Text>•</Text>
                            <Text>
                                {room?.rooms}
                                room{room?.rooms === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar
                    name={room?.owner.name}
                    size={"xl"}
                    src={room?.owner.avatar}
                />
            </HStack>
            <Box mt={10}>
                <Heading fontSize={"2xl"}>
                    <HStack>
                        <FaStar />
                        {room?.rating}
                    </HStack>
                </Heading>
            </Box>
        </Box>
    );
}
