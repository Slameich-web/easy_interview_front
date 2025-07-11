import { Typography, Box, CardContent, Chip } from "@mui/material";
import { Card } from "../Card";
import { StudyPlan } from "../../types/studyPlan";
import Button from "../Button";

interface StudyPlanCardProps {
  studyPlan: StudyPlan;
  onSelect: (studyPlan: StudyPlan) => void;
  isSelected?: boolean;
}

export const StudyPlanCard = ({ 
  studyPlan, 
  onSelect, 
  isSelected = false 
}: StudyPlanCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isSelected ? "2px solid #4caf50" : "1px solid rgba(255, 255, 255, 0.2)",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        "&:hover": {
          transform: isSelected ? "scale(1.02)" : "translateY(-8px)",
          borderColor: isSelected ? "#4caf50" : "rgba(255, 255, 255, 0.4)",
        },
      }}
    >
      <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#ffffff",
              mb: 2,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {studyPlan.name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {studyPlan.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Темы курса ({studyPlan.topics.length}):
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {studyPlan.topics.slice(0, 6).map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "12px",
                    height: "24px",
                  }}
                />
              ))}
              {studyPlan.topics.length > 6 && (
                <Chip
                  label={`+${studyPlan.topics.length - 6} еще`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    color: "#ffffff",
                    fontSize: "12px",
                    height: "24px",
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Button
          variant={isSelected ? "primary" : "secondary"}
          fullWidth
          onClick={() => onSelect(studyPlan)}
          sx={{ mt: "auto" }}
        >
          {isSelected ? "✓ Выбрано" : "Выбрать курс"}
        </Button>
      </CardContent>
    </Card>
  );
};