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

  const generateReviewLink = async () => {
    setLoading(true);
    if (placeName.length !== 0 && placeData.length !== 0) {
      const id: any = placeData.find(
        (e: any) =>
          e.name.toLowerCase() === placeName.split("Location:")[0].toLowerCase()
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
      return setOpen(false);
    }
    async function getList(nextValue: any) {
      setPlaceData([]);
      setOpen(false);
      setLoading(true);
      const url = `https://review-genartor-sytem.vercel.app/api`;
      const response = await axios.get(`${url}`, {
        params: { text: nextValue.split("Location:")[0] },
      });
      setPlaceData(response.data.data.results);
      setOpen(true);
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
          flexWrap: { md: "nowrap", xs: "wrap" },
        }}
      >
        <Autocomplete
          freeSolo
          fullWidth
          onInputChange={(event, newValue) => {
            setPlaceName(newValue);
          }}
          value={placeName}
          id="google-place-api-id"
          disableClearable
          open={open}
          options={placeData?.map(
            (option: any) =>
              `${option?.name} Location: ${option?.formatted_address}`
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              // label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
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
