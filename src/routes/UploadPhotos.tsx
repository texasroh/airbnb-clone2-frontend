import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IUploadPhotoForm, IUPloadPhotoResponse } from "../types";

export default function UploadPhotos() {
  const { register, watch, handleSubmit, reset } = useForm<IUploadPhotoForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image Uploaded!",
        isClosable: true,
        description: "Feel free to upload more images",
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I Love react",
          file: `https://imagedelivery.net/${"some token"}/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUPloadPhotoResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = () => {
    uploadURLMutation.mutate();
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Container>
            <Heading textAlign={"center"}>Upload a Photo</Heading>
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={10}
            >
              <FormControl>
                <Input {...register("file")} type="file" accept="image/*" />
              </FormControl>
              <Button
                isLoading={
                  createPhotoMutation.isLoading ||
                  uploadImageMutation.isLoading ||
                  uploadURLMutation.isLoading
                }
                w="full"
                colorScheme={"red"}
                type="submit"
              >
                Upload photo
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
