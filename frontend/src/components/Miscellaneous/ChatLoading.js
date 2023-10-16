import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function ChatLoading() {
  return (
    <>
      <Stack>
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
        <Skeleton height={"30px"} />
      </Stack>
    </>
  );
}

export default ChatLoading;
