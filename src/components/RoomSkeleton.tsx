import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton height={280} rounded={"2xl"} mb={7} />
      <SkeletonText noOfLines={2} w={"50%"} mb={7} />
      <SkeletonText noOfLines={1} w={"20%"} />
    </Box>
  );
}
