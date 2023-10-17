import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar, Text, Tooltip, VStack } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Avatar
                  mt={"2px"}
                  mr={1}
                  size={"sm"}
                  cursor={"default"}
                  name={m.sender.name}
                  src={m.sender.pic}
                />

                <Text fontSize={12} cursor={"default"}>
                  {m.sender.name}
                </Text>
              </div>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {m.content}
              <span style={{ fontSize: "8px" }}>{m.time}</span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
