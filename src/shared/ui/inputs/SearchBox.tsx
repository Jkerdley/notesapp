import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./SearchBox.module.css";

export type onInputChange = {
  onInputChange: (value: string) => void;
};
export function SearchBox({ onInputChange }: onInputChange) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };
  return (
    <div className={styles.basicTextField}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0, width: "17.5vw", bgcolor: "#f4f7fa" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          id="outlined-basic"
          label="Поиск"
          variant="outlined"
        />
      </Box>
    </div>
  );
}
