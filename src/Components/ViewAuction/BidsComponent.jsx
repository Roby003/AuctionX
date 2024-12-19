import { Badge, Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PiApproximateEquals } from "react-icons/pi";
import { useWeb3 } from "../../context/useWeb3";
import { AuctionStates, getStateString } from "../../statics/AuctionStates";

const BidsComponent = ({ endBlock, highestBid, placeBid, owner, cancelAuction, finishAuction, state }) => {
  const { web3, accounts, weiToDollarConvertor } = useWeb3();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [bid, setBid] = useState(null);
  const [usdValue, setUsdValue] = useState(0);
  useEffect(() => {
    if (highestBid != undefined) setUsdValue(weiToDollarConvertor(parseInt(highestBid.toString())).toFixed(8));
  }, [highestBid]);
  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds % 86400) / 3600);
    const minutes = Math.floor(((timeInSeconds % 86400) % 3600) / 60);
    const seconds = ((timeInSeconds % 86400) % 3600) % 60;
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  useEffect(() => {
    const updateTimer = () => {
      web3.eth.getBlockNumber().then((current) => {
        const blocksRemaining = parseInt(endBlock.toString()) - parseInt(current.toString());
        const timeRemainingInSeconds = blocksRemaining * 15; // Assuming 15 seconds per block
        setTimeRemaining(timeRemainingInSeconds);
      });
    };

    if (web3 && web3.eth && endBlock) {
      updateTimer();
    }

    const timerInterval = setInterval(updateTimer, 15000);

    return () => clearInterval(timerInterval);
  }, [web3, endBlock]);

  const bidHandler = () => {
    placeBid(bid);
    setBid(null);
  };

  const cancelHandler = async () => {
    await cancelAuction();
  };

  const finishHandler = async () => {
    finishAuction();
  };

  // Function to dynamically return badge color based on auction state
  const getBadgeColor = (state) => {
    switch (state) {
      case AuctionStates.running:
        return "green";
      case AuctionStates.canceled:
        return "red";
      case AuctionStates.ended:
        return "gray";
      default:
        return "blue";
    }
  };

  return (
    <Box
      w="100%"
      maxW="430px"
      h="52%"
      mx="auto"
      mt="13%"
      p="6"
      rounded="lg"
      bg="white"
      shadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      {/* Card Heading */}
      <div className="row">
        <div className="col" style={{ display: "flex" }}>
          <Heading size="md" mb="6" alignContent="start">
            Auction Bids
          </Heading>
        </div>
        <div className="col" style={{ display: "flex", justifyContent: "flex-end", alignItems: " flex-start" }}>
          <Badge colorScheme={getBadgeColor(state)} px={3} py={1} rounded="md">
            {getStateString(state)}
          </Badge>
        </div>
      </div>

      {/* Auction Information Section */}
      <Flex direction="column" mb="8" mt="5">
        {/* Auction State with Badge */}

        {/* Time Remaining */}
        <Flex justify="space-between" mb="4">
          <Text fontWeight="bold" textAlign="start">
            Time Remaining:
          </Text>
          <Text>{formatTime(timeRemaining)}</Text>
        </Flex>

        {/* Highest Bid */}
        {highestBid != undefined && (
          <Flex justify="space-between">
            <Text fontWeight="bold">Highest Bid:</Text>
            <Text fontSize="lg" color="green.500">
              {parseInt(highestBid.toString())} wei
            </Text>
          </Flex>
        )}

        {highestBid != undefined && usdValue != undefined && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Icon as={PiApproximateEquals} className="iconColor" color={"#006340 "}></Icon>

            <Flex justify="space-between">
              <Text fontSize="lg" color="green.500">
                {usdValue.toString()} $
              </Text>
            </Flex>
          </div>
        )}
      </Flex>

      {/* Action Section */}
      <Flex direction="column" alignItems="center">
        {accounts[0] == owner
          ? state !== AuctionStates.canceled && (
              <Button rounded={"full"} colorScheme="red" size="lg" w="100%" onClick={cancelHandler} mb="4">
                Cancel Auction
              </Button>
            )
          : state !== AuctionStates.canceled &&
            state !== AuctionStates.ended && (
              <>
                <FormControl mb="4">
                  <FormLabel>Your bid (in eth)</FormLabel>
                  <Input
                    bg="gray.100"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder="Enter bid amount"
                  />
                </FormControl>
                <Button className="bgGreen" rounded={"full"} size="lg" w="100%" onClick={bidHandler}>
                  Place Bid
                </Button>
              </>
            )}

        {((state == AuctionStates.canceled && accounts[0] != owner) || state == AuctionStates.ended) && (
          <Button rounded={"full"} colorScheme="green" size="lg" w="100%" onClick={finishHandler} mt="4">
            Finish Auction
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default BidsComponent;
