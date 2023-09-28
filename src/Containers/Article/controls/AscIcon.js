import React from 'react';
import KeyBoardUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyBoardDownIcon from "@mui/icons-material/KeyboardArrowDown";


const AscIcon = () => {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "Center",
          alignItems: "Center",
          marginLeft: "5px"
        }}
      >
        <KeyBoardUpIcon fontSize="6" />
      </span>
    );
  };

  export default AscIcon;