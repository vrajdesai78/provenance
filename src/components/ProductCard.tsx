import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import Button from "../components/form-elements/button";
import { QRCode } from "react-qr-svg";
import { BsArrowUpRight } from "react-icons/bs";
import { useRouter } from "next/router";

interface ProductProps {
  productId: number;
  name: string;
  description: string;
  imageURL: string;
}

export default function ProductCard(props: ProductProps) {
  const router = useRouter();
  const { productId, name, description, imageURL } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={imageURL}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {productId}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {name}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            // onClick={() => {
            //   router.push(`/producthistory?productId=${productId}`);
            // }}
            // write onclick to call the api and get the data
            onClick={() => {onOpen();}}
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> Verify authenticity of product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text className="font-semibold text-sm text-gray-500 text-center pb-5 -pt-5">
                    Just scan the QR code and check the provenance.
                  </Text>
                  <Box className="flex flex-col items-center justify-center">
                    <QRCode
                      level="Q"
                      style={{ width: 350 }}
                      value={""}
                    />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button label="Close" onClick={onClose} />
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
