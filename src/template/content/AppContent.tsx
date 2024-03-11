import React from "react";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import MixChart from "./component/MixChart";
import ContentTable from "./component/ContentTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface contentPorps {
  selectStock: {
    stock_id: string;
    stock_name: string;
    stock_option: string;
  };
  dataForChart: {
    revenueMonthData: number[];
    revenueMonth: string[];
    revenueGrowthRate: number[];
  };
  searchStockInfo: (stockId: string, searchYears: number) => void;
}
const ContentStyled = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBottom: "50px",
});
const ContentBox = styled(Box)(({ theme }) => ({
  padding: "5px 20px",
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: "5px",
}));
const ContentBoxforNonce = styled(Box)({
  textAlign: "end",
});
const FilterArea = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const CustomSelect = styled(Select)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "#fff",
  border: `none`,
}));
const TitleBox = styled("div")(({ theme }) => ({
  color: "#fff",
  textAlign: "center",
  p: {
    background: theme.palette.secondary.main,
    borderRadius: "4px",
    padding: "9px 14px",
  },
}));
const AppContent = (props: contentPorps) => {
  const { selectStock, dataForChart, searchStockInfo } = props;
  const handleChangeSelect = (value: any) => {
    const searchYears = value.target.value;
    searchStockInfo(selectStock.stock_id, searchYears);
  };
  return (
    <ContentStyled>
      <ContentBox>
        <p>
          {selectStock.stock_name} ({selectStock.stock_id})
        </p>
      </ContentBox>
      <ContentBox>
        <FilterArea>
          <TitleBox>
            <p>每月營收</p>
          </TitleBox>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <CustomSelect
              defaultValue={5}
              onChange={handleChangeSelect}
              autoWidth
              label=""
              size="small"
              IconComponent={() => (
                <KeyboardArrowDownIcon style={{ color: "white" }} />
              )}
            >
              <MenuItem value={3}>近 3 年</MenuItem>
              <MenuItem value={5}>近 5 年</MenuItem>
              <MenuItem value={8}>近 8 年</MenuItem>
            </CustomSelect>
          </FormControl>
        </FilterArea>
        <MixChart dataForChart={dataForChart} />
      </ContentBox>
      <ContentBox>
        <FilterArea>
          <TitleBox>
            <p>詳細數據</p>
          </TitleBox>
        </FilterArea>
        <ContentTable dataForChart={dataForChart} />
      </ContentBox>
      <ContentBoxforNonce>
        <p>圖表單位 : 千元，數據來自公開資訊觀測站</p>
        <p>網頁圖表歡迎轉貼引用，請註明出處為財報狗</p>
      </ContentBoxforNonce>
    </ContentStyled>
  );
};

export default AppContent;
