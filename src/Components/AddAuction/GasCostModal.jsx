import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const GasCostModal = ({ isOpen, onClose, gasEstimate, clickHandler }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Before you continue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>The gas estimation for this action is: {gasEstimate}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" rounded="full" className="bgGreen" mr={3} onClick={clickHandler}>
            Add
          </Button>
          <Button variant="ghost" rounded="full" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GasCostModal;
