import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import homePageImage from "../../statics/output-onlinepngtools.png";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box
      bgSize="cover"
      bgPosition="center"
      h="93vh"
      minH={"100vh"}
      w="100%"
      position="absolute"
      textAlign="center"
      overflow={"hidden"}
      top="0"
      left="0%"
      backgroundImage={homePageImage}
      className="backColor"
    >
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <div style={{ marginLeft: "15%", marginTop: "4%" }}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
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
              <Text as={"span"} display="inline-block">
                Discover the Future
              </Text>
              <br />
              <Text as={"span"} display="inline-block">
                of Auctions with{" "}
              </Text>
              <Text as={"span"} display="inline-block" color="green.500">
                AuctionX
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.600"} textAlign="left">
              The most secure, transparent, and efficient way to auction your assets using Web3 technology
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} alignSelf={"start"}>
              <Button
                rounded={"full"}
                bg={"green.400"}
                color={"white"}
                px={8}
                py={6}
                _hover={{
                  bg: "green.500",
                }}
                onClick={() => navigate("/auctions")}
                className="bgGreen"
              >
                Start Bidding Now
              </Button>
            </Stack>
          </Stack>
          <br />
        </div>
      </Stack>
    </Box>
  );
};

export default HomePage;
