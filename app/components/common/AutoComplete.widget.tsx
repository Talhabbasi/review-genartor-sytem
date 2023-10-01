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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
const GOOGLE_API_KEY = "AIzaSyA2LspnTSqxHCtnUKpOr_IAyFoTLrqFk84";
const REBRANDLY_API_KEY = "3903b2fff9fa474b9aa1fc2a7e7dd0a9";
const REBRANDLY_WORKSPACE_KEY = "fc0d5e55b7744e15a2e75871b3e14a24";
const DOMAIN_NAME = "rebrand.ly";
const AutoCompleteWidget = () => {
  const [placeId, setPlaceId] = useState<string>("");
  const [reviewLink, setReviewLink] = useState<any>("");
  const [placeData, setPlaceData] = useState([]);

  const generateReviewLink = async () => {
    try {
      // Replace 'YOUR_GOOGLE_API_KEY' with your actual Google Maps API key
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAhpjJ_TZmx-p2QF0SKM3hlW0_zRPMAB18&place_id=ChIJEfYKhTvmc0gR3dLTvOJwkZc`
      );
      const placeDetails = response.data.result;
      // console.log(placeDetails);
      // const url = `https://www.google.com/maps/place/?q=place:ChIJEfYKhTvmc0gR3dLTvOJwkZc`;

      // // Shorten the URL using the Rebrandly API
      // const rebrandlyResponse = await axios.post(
      //   "https://api.rebrandly.com/v1/links",
      //   {
      //     destination: url,
      //     domain: { fullName: DOMAIN_NAME },
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       apikey: REBRANDLY_API_KEY,
      //       workspace: REBRANDLY_WORKSPACE_KEY,
      //     },
      //   }
      // );

      // setReviewLink({
      //   ...rebrandlyResponse.data,
      //   review_url:
      //     "https://search.google.com/local/writereview?placeid=ChIJEfYKhTvmc0gR3dLTvOJwkZc",
      // });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getList() {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=asd&key=${GOOGLE_API_KEY}`
      );
      setPlaceData(response.data);
    }
    if (placeId.length !== 0) {
      getList();
    }
  }, [placeId]);
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
          onSelect={(e: any) => setPlaceId(e.target.value)}
          fullWidth
          id="google-place-api-id"
          disableClearable
          options={top100Films.map((option) => option.title)}
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
          // onClick={generateReviewLink}
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
