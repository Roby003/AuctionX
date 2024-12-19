/* eslint-disable */

import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "../../Components/Auction/AuctionCard";
import { useWeb3 } from "../../context/useWeb3";

const AuctionsList = () => {
  const navigate = useNavigate();
  const { web3, accounts, contracts, setExchangeRate } = useWeb3();
  const { auctionCreator, auctions, weiToUsd } = contracts;
  const [auctionList, setAuctionList] = useState({});

  useEffect(() => {
    if (auctionCreator) {
      loadAuctions();
    }
  }, [auctionCreator]);

  useEffect(() => {
    if (weiToUsd) loadExchangeRate();
    console.log("exchange rate loaded");
  }, [weiToUsd]);
  const loadAuctions = async () => {
    const auctions = await auctionCreator.methods.getAuctions().call();
    for (let auction of auctions) {
      // debugger;
      setAuctionList((oldState) => ({
        ...oldState,
        [auction.auctionAddress]: { ...auction, title: auction.title },
      }));
    }
  };

  const loadExchangeRate = async () => {
    setExchangeRate(await weiToUsd.methods.getLatestPrice().call());
  };

  return (
    <>
      <div className="row">
        <div className="col col-3" style={{ display: "flex" }}>
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
            Auctions
          </Heading>
        </div>
        <div className="col col-6" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Button
            rounded={"full"}
            _hover={{
              bg: "green.800",
            }}
            onClick={() => navigate("/auctions/add")}
            className="bgGreen"
            mr={20}
            mt={5}
          >
            Add object to auction
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.values(auctionList).length > 0 &&
          Object.values(auctionList).map((auction) => {
            return (
              <div className="">
                <AuctionCard auction={auction} removeHandler={() => {}} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AuctionsList;
