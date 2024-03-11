import React, { useEffect, useState } from "react";
import { AppHeader, AppSideBar, AppContent } from "./template";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { SearchStockAPI } from "./api/SearchStockAPI";
import moment from "moment";
interface ChartData {
  revenueMonthData: number[];
  revenueMonth: string[];
  revenueGrowthRate: number[];
}
const AppBody = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "30px",
});
function App() {
  const [stockInfo, setStockInfo] = useState([
    {
      stock_id: "",
      stock_name: "",
      stock_option: "",
    },
  ]);
  const [selectStock, setSelectStock] = useState({
    stock_id: "",
    stock_name: "",
    stock_option: "",
  });
  const [dataForChart, setDataForChart] = useState<ChartData>({
    revenueMonthData: [],
    revenueMonth: [],
    revenueGrowthRate: [],
  });
  //搜尋單一股票營收訊息
  const searchStockInfo = (stockId: string, searchYears: number) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const sixYearsAgo = new Date().getFullYear() - searchYears;
    SearchStockAPI.GetStockRevenue({
      stockId: stockId,
      startDate: `${sixYearsAgo}-01-01`,
      endDate: today,
    }).then((res) => {
      setDataForChart(res!);
    });
  };
  useEffect(() => {
    SearchStockAPI.SearchStock().then((res) => {
      setStockInfo(res!);
    });
    searchStockInfo("2867", 5);
    setSelectStock({
      stock_id: "2867",
      stock_name: "三商壽",
      stock_option: "2867 三商壽",
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppHeader
        stockInfo={stockInfo}
        setSelectStock={setSelectStock}
        setDataForChart={setDataForChart}
        searchStockInfo={searchStockInfo}
      />
      <AppBody>
        <AppSideBar />
        <AppContent
          selectStock={selectStock}
          dataForChart={dataForChart}
          searchStockInfo={searchStockInfo}
        />
      </AppBody>
    </ThemeProvider>
  );
}

export default App;
