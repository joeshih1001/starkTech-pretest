import React,{useEffect, useRef} from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toThousands } from "../../../mathHandler";
interface tablePorps {
  dataForChart: {
    revenueMonthData: number[];
    revenueMonth: string[];
    revenueGrowthRate: number[];
  };
}
const AutoPaper = styled(Paper)({
  overflow: "auto",
});
const StickyCeil = styled(TableCell)({
  position: "sticky",
  left: 0,
  zIndex: 10, // 保证表头始终在最顶层
  backgroundColor: "#ffffff", // 设置背景色，使其不透明
  minWidth: "150px",
  fontWeight:'900',
  fontSize:'16px'
});
const DataCeil = styled(TableCell)({
  whiteSpace: "nowrap",
  minWidth: "fit-content",
});

const ContentTable = (props: tablePorps) => {
  const { dataForChart } = props;
  const tableRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if(tableRef.current){
        tableRef.current.scrollLeft = tableRef.current.scrollWidth
    }
  },[dataForChart])
  return (
    <AutoPaper ref={tableRef}>
      <Table>
        <TableBody>
          <TableRow >
            <StickyCeil>年度月份</StickyCeil>
            {dataForChart &&
              dataForChart.revenueMonth.map((d, i) => {
                return <DataCeil sx={{fontWeight:'700'}} key={i}>{d.slice(0,7)}</DataCeil>;
              })}

            {/* Add more cells as needed */}
          </TableRow>
          <TableRow>
            <StickyCeil>每月營收(千元)</StickyCeil>
            {dataForChart &&
              dataForChart.revenueMonthData.map((d, i) => {
                return <DataCeil key={i}>{toThousands(d)}</DataCeil>;
              })}
          </TableRow>
          <TableRow>
            <StickyCeil>單月營收年增率(%)</StickyCeil>
            {dataForChart &&
              dataForChart.revenueGrowthRate.map((d, i) => {
                return <DataCeil key={i}>{d}</DataCeil>;
              })}
          </TableRow>
        </TableBody>
      </Table>
    </AutoPaper>
  );
};

export default ContentTable;
