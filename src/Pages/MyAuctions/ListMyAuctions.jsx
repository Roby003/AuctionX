import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "../../Components/Auction/AuctionCard";
import { useWeb3 } from "../../context/useWeb3";

const ListMyAuctions = () => {
  const navigate = useNavigate();
  const { web3, accounts, contracts } = useWeb3();
  const { auctionCreator, auctions } = contracts;
  const [auctionList, setAuctionList] = useState({});

  useEffect(() => {
    if (auctionCreator) {
      loadAuctions();
    }
  }, [auctionCreator]);

  const loadAuctions = async () => {
    const auctions = await auctionCreator.methods.getMyAuctions(accounts[0]).call();
    for (let auction of auctions) {
      setAuctionList((oldState) => ({
        ...oldState,
        [auction.auctionAddress]: { ...auction, title: auction.title },
      }));
    }
  };

  return (
    <Flex flexDir={"column"} w={"100%"}>
      <Flex flexDir={"column"}>
        <Heading
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="extrabold"
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
          My Auctions
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.600"} textAlign="left" mt={5}>
          Here, you can view all the auctions you've bid on. If an auction gets canceled, simply click "Finish" to
          reclaim your funds instantly!
        </Text>
      </Flex>
      <Flex justifyContent={""} flexDir={"row"} alignItems={""} mt={15}>
        {Object.values(auctionList).length > 0 ? (
          Object.values(auctionList).map((auction) => {
            return <AuctionCard auction={auction} removeHandler={() => {}} />;
          })
        ) : (
          <Heading>You have not bid in any auction yet</Heading>
        )}
      </Flex>
    </Flex>
  );
};

export default ListMyAuctions;
