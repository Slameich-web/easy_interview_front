import { Card as MUICard, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(MUICard)(() => ({
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    "&::before": {
      opacity: 1,
    },
  },
}));

const Card = (props: CardProps) => {
  return <StyledCard {...props} />;
};

export default Card;
