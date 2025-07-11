import { Typography, Box, CardContent } from "@mui/material";
import { Card } from "../Card";
import { StudyPlan } from "../../types/studyPlan";
import { Chip } from "../Chip";
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
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isSelected 
          ? "2px solid #4caf50" 
          : "1px solid rgba(255, 255, 255, 0.2)",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isSelected
            ? "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)"
            : "transparent",
          transition: "all 0.3s ease",
        },
        "&:hover": {
          transform: isSelected ? "scale(1.02)" : "translateY(-8px)",
          borderColor: isSelected ? "#4caf50" : "rgba(255, 255, 255, 0.4)",
          boxShadow: isSelected
            ? "0 20px 40px rgba(76, 175, 80, 0.3)"
            : "0 20px 40px rgba(0, 0, 0, 0.2)",
          "&::before": {
            background: isSelected
              ? "linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.08) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          },
        },
      }}
    >
      <CardContent 
        sx={{ 
          p: { xs: 2.5, md: 3 }, 
          height: "100%", 
          display: "flex", 
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {/* Header */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                mb: 1,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {studyPlan.name}
            </Typography>
            
            {isSelected && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#4caf50",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                }}
              >
                ✓ Выбрано
              </Box>
            )}
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 3,
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", md: "1rem" },
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {studyPlan.description}
          </Typography>

          {/* Topics */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 1.5,
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              📚 Темы курса ({studyPlan.topics.length}):
            </Typography>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {studyPlan.topics.slice(0, 5).map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "11px",
                    height: "26px",
                    fontWeight: 500,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                />
              ))}
              
              {studyPlan.topics.length > 5 && (
                <Chip
                  label={`+${studyPlan.topics.length - 5}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    color: "#ffffff",
                    fontSize: "11px",
                    height: "26px",
                    fontWeight: 600,
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Button
          variant={isSelected ? "primary" : "secondary"}
          fullWidth
          onClick={() => onSelect(studyPlan)}
          sx={{ 
            mt: "auto",
            py: 1.5,
            fontSize: { xs: "0.9rem", md: "1rem" },
            fontWeight: 600,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {isSelected ? "✓ Выбрано" : "Выбрать курс"}
        </Button>
      </CardContent>
    </Card>
  );
};