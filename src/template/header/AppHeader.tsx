import React, { Dispatch, SetStateAction, useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

interface StockInfoPorps {
  stockInfo: {
    stock_id: string;
    stock_name: string;
    stock_option: string;
  }[];
  setSelectStock: Dispatch<
    SetStateAction<{
      stock_id: string;
      stock_name: string;
      stock_option: string;
    }>
  >;
  setDataForChart: Dispatch<
    SetStateAction<{
      revenueMonthData: number[];
      revenueMonth: string[];
      revenueGrowthRate: number[];
    }>
  >;
  searchStockInfo: (stockId: string, searchYears: number) => void;
}
const AppHeaderStyled = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "15px 0",
  background: "#fff",
});

const AppHeader = (props: StockInfoPorps) => {
  const { stockInfo, searchStockInfo, setSelectStock } = props;
  const [tempSelectStock, setTempSelectStock] = useState({
    stock_id: "2867",
    stock_name: "三商壽",
    stock_option: "2867 三商壽",
  });
  const handleSelectStock = (
    event: any,
    value:
      | string
      | { stock_id: string; stock_name: string; stock_option: string }
      | null
  ) => {
    if (typeof value === "object" && value !== null) {
      setTempSelectStock(value);
    }
  };
  return (
    <AppHeaderStyled>
      <Paper sx={{ width: "40%", display: "flex", alignItems: "center" }}>
        <Autocomplete
          freeSolo
          sx={{
            flexGrow: "1",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          id="size-small-standard"
          options={stockInfo}
          getOptionLabel={(option) =>
            (
              option as {
                stock_id: string;
                stock_name: string;
                stock_option: string;
              }
            ).stock_option
          }
          renderInput={(params) => (
            <TextField {...params} label="輸入台/美股代號，查看公司價值" />
          )}
          onChange={handleSelectStock}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            searchStockInfo(tempSelectStock.stock_id, 5);
            setSelectStock(tempSelectStock);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </AppHeaderStyled>
  );
};

export default AppHeader;
