"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#808080",
          "& label.Mui-focused": {
            color: "white",
          },
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },

    // Select
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#454545",
          color: "white",
          border: "none",
          paddingTop: "0",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        },
        icon: {
          color: "white",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        list: {
          padding: "0",
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          "&::placeholder": {
            color: "gray",
          },
          color: "white",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": { backgroundColor: "#808080" },
          backgroundColor: "#525252",
          color: "white",
          "&:hover": {
            backgroundColor: "#808080",
            color: "black",
          },
        },
      },
    },

    // Text field
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "transparent",
          color: "white",
          border: "none",
          borderRadius: "10px",
          "& label": {
            color: "#808080",
          },
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "transparent",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#454545",
          color: "white",
          border: "none",
          borderRadius: "10px",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },

    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#4141af",
          color: "white",
          borderRadius: "10px",
          padding: "10px 15px",
          width: "auto",
          textTransform: "none",
        },
      },
    },

    // Checkbox
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "6px",
          color: "white",
          "&:hover": {
            borderColor: "violet",
          },
          "&.Mui-checked": {
            color: "white",
          },
          "&:hover.Mui-checked": {
            borderColor: "violet",
          },
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#4141af",
          color: "#fff",
          borderRadius: "10px",
          padding: "1px",
          height: "20px",
        },
      },
    },
  },
});

export default theme;
