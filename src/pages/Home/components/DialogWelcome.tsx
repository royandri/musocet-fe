import React, { useContext, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import SocketContext from "context/SocketContext";

type DialogWelcomeProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DialogWelcome = ({ isOpen, onClose }: DialogWelcomeProps) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const { socket, user } = useContext(SocketContext).SocketState;
  
  const handleOnChangeName = () => {
    if (socket) {
      socket.emit("set_name", {
        userId: user.userId,
        name: initialRef.current?.value,
      });
      onClose();
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {user.name ? "Change My Name" : "Welcome To Musocet.Fm!"}
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                {user.name ? "My name is" : "Tell us your name"}
              </FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {user.name && (
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button colorScheme="green" mr={3} onClick={handleOnChangeName}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DialogWelcome;
