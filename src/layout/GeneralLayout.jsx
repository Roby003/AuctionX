import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const GeneralLayout = () => {
  return (
    <div className="flex">
      <Flex minH="100vh">
        <Header />
        <Flex px="10%" py={20} flexDir={"column"} className="backColor" w="100%">
          <Outlet />
        </Flex>
      </Flex>
    </div>
  );
};

export default GeneralLayout;
