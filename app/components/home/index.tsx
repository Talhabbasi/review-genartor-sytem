"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AutoCompleteWidget from "../common/AutoComplete.widget";
import ArrowHome from "@/app/assets/svgs/arrow-home";
import bg from "../../assets/images/bg.png";

const HomeComponent = () => {
  return (
    <Box
      sx={{
        padding: "40px 0",
        position: "relative",
        backgroundColor: "#f7fbff",
        // backgroundImage: `url(${bg.src})`,
        // backgroundSize: "100%",
        // backgroundPosition: "center",
      }}
    >
      <Container>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: "0x",
              top: "100px",
              display: { xs: "none", lg: "block" },
            }}
          >
            <ArrowHome />
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: "#222329",
              textAlign: "center",
              fontSize: "42px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "50px",
              mb: "31px",
            }}
          >
            Google{" "}
            <Typography
              component={"span"}
              sx={{
                color: "#7B71EB",
                textAlign: "center",
                fontSize: "42px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "50px",
              }}
            >
              Review Link Generator
            </Typography>
          </Typography>
          <Typography
            sx={{
              color: "#6F6C90",
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "26px",
              maxWidth: "800px",
              margin: "auto",
              mb: "40px",
            }}
          >
            Grow your online reputation with our free Google review link
            generator. In just a few clicks, generate a unique Google review
            link and effortlessly share it with your customers.
          </Typography>
          <AutoCompleteWidget />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeComponent;
