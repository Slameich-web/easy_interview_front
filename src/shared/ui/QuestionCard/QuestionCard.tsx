import { Typography, Box, CardContent, Chip } from "@mui/material";
import { Card } from "../Card";
import { Question, DIFFICULTY_LABELS, DIFFICULTY_COLORS, DifficultyLevel } from "../../types/question";

interface QuestionCardProps {
  question: Question;
  onSelect: (question: Question) => void;
  questionNumber: number;
}

export const QuestionCard = ({ question, onSelect, questionNumber }: QuestionCardProps) => {
  const difficultyColor = DIFFICULTY_COLORS[question.difficulty as DifficultyLevel] || '#757575';
  const difficultyLabel = DIFFICULTY_LABELS[question.difficulty as DifficultyLevel] || question.difficulty;

  return (
    <Card
      onClick={() => onSelect(question)}
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          transition: "all 0.3s ease",
        },
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          "&::before": {
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          },
        },
        "&:active": {
          transform: "translateY(-4px) scale(1.01)",
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
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Вопрос #{questionNumber}
          </Typography>
          
          <Chip
            label={difficultyLabel}
            size="small"
            sx={{
              backgroundColor: difficultyColor,
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: "24px",
            }}
          />
        </Box>

        {/* Question Text */}
        <Box sx={{ flex: 1, mb: 3 }}>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", md: "1rem" },
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {question.text}
          </Typography>
        </Box>

        {/* Educational Materials */}
        {(question.educationalMaterialsText || question.educationalMaterialsLinks.length > 0) && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 1,
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              📚 Материалы для изучения
            </Typography>
            
            {question.educationalMaterialsText && (
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.8rem",
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {question.educationalMaterialsText}
              </Typography>
            )}
            
            {question.educationalMaterialsLinks.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.75rem",
                }}
              >
                🔗 {question.educationalMaterialsLinks.length} ссылок
              </Typography>
            )}
          </Box>
        )}

        {/* Action Button */}
        <Box
          sx={{
            mt: "auto",
            textAlign: "center",
            py: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0 0 20px 20px",
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.9rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            💡 Нажмите для ответа
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};