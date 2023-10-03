"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import { useDebounce } from "use-debounce";

const AutoCompleteWidget = () => {
  const [placeName, setPlaceName] = useState<any>("");
  const [reviewLink, setReviewLink] = useState<any>(false);
  const [loading, setLoading] = useState<any>();
  const [placeData, setPlaceData] = useState([]);
  const [value] = useDebounce(placeName, 100);
  const [open, setOpen] = useState<any>(false);
  const [selected, setSelected] = useState(false);

  const generateReviewLink = async () => {
    setLoading(true);
    if (placeName.length !== 0 && placeData.length !== 0) {
      const id: any = placeData.find(
        (e: any) =>
          `${e.description.toLowerCase()}}` === placeName.toLowerCase()
      );
      const url = `https://review-genartor-sytem.vercel.app/api/get-review`;
      const response = await axios.post(`${url}?placeId=${id?.place_id}`);
      setReviewLink(response.data.data);
      setPlaceName("");
      setPlaceData([]);
      setLoading(false);
    }
    try {
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeName === "" || value === "") {
      setPlaceData([]);
      return setOpen(false);
    }
    async function getList(nextValue: any) {
      setPlaceData([]);
      setLoading(true);
      const url = `https://review-genartor-sytem.vercel.app/api`;
      const response = await axios.get(`${url}`, {
        params: { text: nextValue },
      });
      setPlaceData(response.data.data.predictions);
      if (selected === false) {
        setOpen(true);
      }
      setLoading(false);
    }
    getList(value);
  }, [value]);
  return (
    <Box
      sx={{
        borderRadius: "6px",
        background: "#FFF",
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
        padding: { xs: "25px", lg: "25px 40px" },
        pb: "60px",
      }}
    >
      <InputLabel
        sx={{
          display: "block",
          color: "#222329",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "30px",
          mb: "10px",
        }}
      >
        Select your business
      </InputLabel>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          position: "relative",
          flexWrap: { md: "nowrap", xs: "wrap" },
        }}
      >
        {open && placeData.length !== 0 && (
          <Box
            sx={{
              border: "1px solid #ccc",
              minHeight: "200px",
              borderRadius: "10px",
              width: "82%",
              maxHeight: "200px",
              overflow: "auto",
              backgroundColor: "white",
              position: "absolute",
              bottom: "-200px",
              zIndex: "100",
              "@media (max-width:900px)": {
                bottom: "-115px",
                width: "100%",
              },
            }}
          >
            {placeData.map((e: any, i) => (
              <Box
                sx={{
                  padding: "20px 10px",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    backgroundColor: "#7B71EB",
                    color: "white",
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setSelected(true);
                  setPlaceName(`${e.description}`);
                  setOpen(false);
                }}
              >
                <span style={{ fontSize: "14px" }}>{e.description}</span>{" "}
              </Box>
            ))}
          </Box>
        )}
        <TextField
          // label="Search input"
          value={placeName}
          onChange={(e) => {
            setSelected(false);
            setPlaceName(e.target.value);
          }}
          fullWidth
          InputProps={{
            type: "search",
          }}
        />

        <Button
          variant="contained"
          onClick={generateReviewLink}
          disabled={
            (placeName.length === 0 && placeData.length === 0) || loading
          }
          sx={{
            color: "#FFF",
            textAlign: "center",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "22px",
            minWidth: "180px",
            padding: "17px",
            borderRadius: "50px",
            border: "1px solid #7B71EB",
            width: { xs: "100%", md: "auto" },
          }}
        >
          Get my link
        </Button>
      </Box>
      {reviewLink && (
        <Typography sx={{ mt: "20px" }}>
          Review Link:{" "}
          <a
            href={reviewLink?.review_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {reviewLink?.shortUrl}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default AutoCompleteWidget;
