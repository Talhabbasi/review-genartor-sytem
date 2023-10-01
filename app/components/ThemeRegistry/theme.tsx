import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const poppins = Poppins({
  weight: ["400", "300", "500", "600", "700"],
  variable: "--font-family",
  subsets: ["latin"],
  display: "swap",
});
const theme = createTheme({
  palette: {
    primary: {
      main: "#7B71EB",
      dark: "#7B71EB",

      light: "#7B71EB",
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          maxWidth: "1280px",
        },
      },
    },
  },
});

export default theme;
