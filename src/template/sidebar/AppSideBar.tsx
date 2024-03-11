import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Stack, Divider } from "@mui/material";
import { ColorKeys } from "../../theme";
interface SideBarProps {
  title: string;
}
const rightBtnTitle = [
  "每月營收",
  "每股盈餘",
  "每股淨值",
  "損益表",
  "總資產",
  "負債和股東權益",
  "現金流量表",
  "股利政策",
  "電子書",
];
const leftBtnTitle = [
  { enTitle: "B", title: "最新動態", color:'sideBarBlack' },
  { enTitle: "F", title: "股票健診",color:'sideBarBlack' },
  { enTitle: "C", title: "財務報表",color:'sideBarBlack' },
  { enTitle: "D", title: "獲利能力" ,color:'sideBarRed'},
  { enTitle: "E", title: "安全性分析",color:'sideBarGreen' },
  { enTitle: "Q", title: "成長力分析",color:'sideBarYellow' },
  { enTitle: "J", title: "價值評估" ,color:'sideBarBlue'},
  { enTitle: "G", title: "董監與籌碼" ,color:'sideBarBlack'},
  { enTitle: "H", title: "關鍵指標" ,color:'sideBarPurple'},
  { enTitle: "I", title: "產品組合" ,color:'sideBarBlue'},
];
const SideBarStyled = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const SideBarLeftNavBtn = styled(Button)<SideBarProps>(({ theme, title }) => ({
  display: "inline-block",

  fontSize: "18px",

  p: {
    lineHight: 1,
    margin: 0,
    color:
      title === "true"
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
  },
  div: {
    borderLeft: `3px solid ${
      title === "true" ? theme.palette.primary.contrastText : "transparent"
    }`,
    height: "90%",
  },
}));
const SideBarRightNavBtn = styled(Button)<SideBarProps>(({ theme, title }) => ({
  color:
    title === "true"
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main,
  fontSize: "16px",
  fontWeight: "700",
  padding:0,
  textAlign:'left',
  div: {
    width:'100%',
    padding:'10px',
    borderLeft: `3px solid ${
      title === "true" ? theme.palette.primary.contrastText : "transparent"
    }`,
  },
}));

const AppSideBar = () => {
  const [selectLeftBtn, setSelectLeftBtn] = useState<string>("財務報表");
  const [selectRightBtn, setSelectRightBtn] = useState<string>("每月營收");
  const handleSelectLeftBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value;
    setSelectLeftBtn(value!);
  };
  const handleSelectRightBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value;
    setSelectRightBtn(value!);
  };
  return (
    <SideBarStyled>
      <Stack>
        {leftBtnTitle.map((d, i) => {
          return (
            <SideBarLeftNavBtn
              title={selectLeftBtn === d.title ? "true" : "false"}
              key={i}
              data-value={d.title}
              onClick={handleSelectLeftBtn}
              color={d.color as ColorKeys}
            >
              <div>
                <span>{d.enTitle}</span>
                <p>{d.title}</p>
              </div>
            </SideBarLeftNavBtn>
          );
        })}
      </Stack>
      <Divider sx={{ border: `0.5px solid #cccccc55` }} />
      <Stack>
        {rightBtnTitle.map((d, i) => {
          return (
            <SideBarRightNavBtn
              title={selectRightBtn === d ? "true" : "false"}
              key={i}
              data-value={d}
              onClick={handleSelectRightBtn}
            >
              <div>{d}</div>
            </SideBarRightNavBtn>
          );
        })}
      </Stack>
    </SideBarStyled>
  );
};

export default AppSideBar;
