import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import logo from "../assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="#E9D8FD"
        display="flex"
        justifyContent="center"
        p={1}
        w="100%"
        m="5px 0 5px 0"
        borderRadius="lg"
        borderWidth="1px"
        alignItems={"center"}
      >
        <img src={logo} style={{ height: "40px", margin: "2px" }} />
        <Text fontSize="4xl" fontFamily="Work sans">
          HeyApp
        </Text>
      </Box>
      <Box
        bg="#E9D8FD"
        w={"100%"}
        p={1}
        borderRadius={"lg"}
        borderWidth={"1px"}
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList mb={"0.1em"}>
            <Tab width={"50%"} color={"black"}>
              Login
            </Tab>
            <Tab width={"50%"} color={"black"}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
