import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "32px",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});