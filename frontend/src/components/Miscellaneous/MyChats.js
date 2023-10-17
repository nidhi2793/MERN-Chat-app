import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useState } from "react";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { GrFormAdd } from "react-icons/gr";
import ChatLoading from "./ChatLoading";
import { getSender, getSenderPic } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";

function MyChats({ fetchAgain }) {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState("");
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={2}
        fontSize={{ base: "20px", md: "25px" }}
        fontFamily="Work sans"
        display={"flex"}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "13px", md: "15px", lg: "16x" }}
            rightIcon={<GrFormAdd />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={2}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={2}
                py={1}
                borderRadius="lg"
                key={chat._id}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {!chat.isGroupChat && (
                    <Avatar
                      mt={"2px"}
                      mr={1}
                      size={"sm"}
                      cursor={"default"}
                      name={getSender(loggedUser, chat.users)}
                      src={getSenderPic(loggedUser, chat.users)}
                    />
                  )}
                  {chat.isGroupChat && (
                    <Avatar
                      mt={"2px"}
                      mr={1}
                      size={"sm"}
                      cursor={"default"}
                      name={chat.chatName}
                    />
                  )}
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </div>

                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>
                      {chat.latestMessage.sender.name === loggedUser.name
                        ? "You"
                        : chat.latestMessage.sender.name}{" "}
                      :{" "}
                    </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
