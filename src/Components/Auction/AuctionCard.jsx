/* eslint-disable */

import { Box, Card, CardBody, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PiApproximateEquals } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../../context/useWeb3";

const AuctionCard = ({ auction, removeHandler }) => {
  const navigate = useNavigate();
  const { weiToDollarConvertor, exchangeRate } = useWeb3();
  const [usdValue, setUsdValue] = useState(0);

  useEffect(() => {
    setUsdValue(weiToDollarConvertor(parseInt(auction.heighestBid.toString())).toFixed(8));
  }, [exchangeRate]);
  return (
    <Card
      _hover={{ transform: "scale(1.05)", transition: "all 0.2s ease-in-out", cursor: "pointer", boxShadow: "lg" }}
      onClick={() => navigate("/auctions/" + auction.id)}
      m={5}
      sx={{ width: "250px", borderRadius: "10px", overflow: "hidden", border: "1px solid #eaeaea" }}
    >
      <CardBody p={0}>
        <Box>
          <Box
            h={{
              base: 64,
              lg: "full",
            }}
            rounded={{
              lg: "lg",
            }}
            bgSize="cover"
            bgPos="center"
          >
            <Image width="100%" height="250px" objectFit="cover" src={auction.imageUrls[0]} alt={auction.title} />
          </Box>
        </Box>
        <Stack spacing="2" p={4} alignItems={"center"}>
          <Text fontWeight="bold" fontSize="lg" isTruncated>
            {auction.title}
          </Text>
          <Text fontSize="md" color="gray.500">
            Highest Bid
          </Text>
          <Text fontWeight="bold" fontSize="xl">
            <span style={{ fontWeight: "normal", margin: "0 5px" }}>{parseInt(auction.heighestBid.toString())}</span>
            wei
          </Text>

          <Icon as={PiApproximateEquals} className="iconColor" color={"#006340 "}></Icon>

          <Text fontWeight="bold" fontSize="xl">
            <span style={{ fontWeight: "normal", margin: "0 5px" }}>{usdValue} $</span>
          </Text>
        </Stack>
        {/* <Box display="flex" justifyContent="space-between" alignItems="center" p={4}>
          <Badge colorScheme="green" fontSize="sm">
            {getStateString(auction.auctionState)}
          </Badge>

          <Badge colorScheme="gray" fontSize="sm">
            Auction
          </Badge>
        </Box> */}
      </CardBody>
    </Card>
  );
};

export default AuctionCard;
