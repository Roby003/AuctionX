/* eslint-disable */
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import ImageSlider from "../../Components/Auction/ImageSlider";
import LoadingOverlay from "../../Components/Common/LoadingOverlay";
import BidsComponent from "../../Components/ViewAuction/BidsComponent";
import { useWeb3 } from "../../context/useWeb3";
import { subscribeToBidPlaced } from "./observables/AuctionObserver";

const ViewAuction = () => {
  let { id } = useParams();
  const toast = useToast();
  const { web3, accounts, contracts, setExchangeRate } = useWeb3();
  const { auctions, weiToUsd } = contracts;
  const [auctionDetails, setAuctionDetails] = useState({ imageUrl: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (weiToUsd) loadExchangeRate();
    console.log("exchange rate loaded");
  }, [weiToUsd]);
  const loadExchangeRate = async () => {
    setExchangeRate(await weiToUsd.methods.getLatestPrice().call());
  };

  useEffect(() => {
    if (auctions && auctions[id]) {
      getAuctionDetails();

      const unsubscribe = subscribeToBidPlaced(auctions[id], getAuctionDetails);
    }
  }, [auctions]);

  useEffect(() => {
    if (auctions && auctions[id]) {
      getAuctionDetails();
    }
  }, [auctions]);

  const getAuctionDetails = async () => {
    let auction = await auctions[id].methods.getAuctionDetails().call();
    console.log(auction);
    setAuctionDetails(auction);
  };

  const placeBid = async (ammount) => {
    setIsLoading(true);
    try {
      const bidAmountWei = web3.utils.toWei(ammount.toString(), "ether");
      await auctions[id].methods.placeBid().send({
        from: accounts[0],
        value: bidAmountWei,
      });
      setIsLoading(false);
      console.log("Bid placed successfully");
      toast({
        title: "Bid placed successfully",
        description: "Bid placed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      setIsLoading(false);
      toast({
        title: "Bid not placed",
        description: "Error during bid placing",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cancelAuction = async () => {
    setIsLoading(true);
    try {
      await auctions[id].methods.cancelAuction().send({
        from: accounts[0],
      });

      setIsLoading(false);
      toast({
        title: "Canceled auction",
        description: "Canceled auction successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      setIsLoading(false);
      toast({
        title: "Error cancelling auction",
        description: "Error cancelling auction",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const finishAuction = async () => {
    setIsLoading(true);
    try {
      await auctions[id].methods.finalizeAuction().send({
        from: accounts[0],
      });
      setIsLoading(false);
      toast({
        title: "Finished auction",
        description: "Finished auction successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      setIsLoading(false);
      toast({
        title: "Error finishing auction",
        description: "Error finishing auction",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const handleAccountChange = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);

  return (
    <Flex flexDir="row" w="100%" h="100%">
      {auctionDetails && auctionDetails.auctionState && (
        <>
          {isLoading && <LoadingOverlay />}
          <Flex flexDir={"column"} w="50%" alignItems={"start"}>
            <Flex dir="row">
              <Heading
                fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                lineHeight="1.2"
                letterSpacing="wide"
                textAlign="left"
                textTransform="uppercase"
                color="blue.800"
                _before={{
                  content: "''",
                  display: "block",
                  width: "120px",
                  height: "5px",
                  backgroundColor: "green.400",
                  marginBottom: "10px",
                }}
              >
                {auctionDetails.title}
              </Heading>
            </Flex>
            {auctionDetails.imageUrls && auctionDetails.imageUrls.length > 0 && (
              <ImageSlider imageLinks={auctionDetails.imageUrls} />
            )}
          </Flex>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <BidsComponent
              endBlock={auctionDetails.endBlock}
              highestBid={auctionDetails.highestBiddingBid}
              placeBid={placeBid}
              owner={auctionDetails.owner}
              cancelAuction={cancelAuction}
              finishAuction={finishAuction}
              state={parseInt(auctionDetails.auctionState.toString())}
            />
            <Box
              w="100%"
              maxW="430px"
              h="52%"
              maxH="220px"
              mx="auto"
              mt="10"
              p="6"
              rounded="lg"
              bg="white"
              shadow="lg"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <div className="row">
                <div className="col" style={{ display: "flex" }}>
                  <Heading size="md" mb="6" alignContent="start">
                    Product Description
                  </Heading>
                </div>
                <div className="col" style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Icon
                    as={RiExpandDiagonalLine}
                    onClick={onOpen}
                    _hover={{ color: "#006340", cursor: "pointer" }}
                  ></Icon>
                </div>
              </div>
              <Text
                maxH="80%"
                h="100%"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <Text textAlign="justify" px={3} overflow={"hidden"} maxH="120px">
                  {auctionDetails.description}
                </Text>
                <div>{"..."}</div>
              </Text>

              {/* <Button onClick={onOpen}>Open Modal</Button> */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader> Product Description</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody px={8}>
                    <Text textAlign="justify">{auctionDetails.description}</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button mr={3} onClick={onClose} className="bgGreen" rounded="full">
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </div>
        </>
      )}
    </Flex>
  );
};

export default ViewAuction;
