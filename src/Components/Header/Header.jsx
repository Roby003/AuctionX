import { Button, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Links = [
  { text: "Home", path: "/" },
  { text: "Auctions", path: "/auctions" },
];

const NavLink = ({ children, path }) => {
  return (
    <Button variant="link" _hover={{ textDecoration: "none", color: "#006340" }}>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
        }}
        href={path}
      >
        {children}
      </Link>
    </Button>
  );
};

export default function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <Flex direction="column" w="200px" minW={"200px"} bg="white" minH="100vh" py={8} px={4} boxShadow="md" zIndex={3}>
      <VStack alignItems="flex-start" spacing={8}>
        <Heading size="md" _hover={{ textDecoration: "none" }}>
          Auction
          <Text as="span" color="#006340" ml={0.3}>
            X
          </Text>
        </Heading>
        <VStack as="nav" spacing={4} align="stretch" w="full">
          {Links.map((link) => (
            <NavLink key={link.text} path={link.path}>
              {link.text}
            </NavLink>
          ))}
          <NavLink path="/myAuctions">My auctions</NavLink>
        </VStack>
      </VStack>
    </Flex>
  );
}
