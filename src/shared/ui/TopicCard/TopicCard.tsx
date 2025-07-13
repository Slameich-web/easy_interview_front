import { Typography, Box, CardContent } from "@mui/material";
import { Card } from "../Card";
import { Topic } from "../../types/topic";

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

export const TopicCard = ({ topic, onSelect }: TopicCardProps) => {
  return (
    <Card
      onClick={() => onSelect(topic)}
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
              {topic.name}
            </Typography>
          </Box>

          {/* Questions Count */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                px: 2,
                py: 1,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                ❓ {topic.questionsCount}{" "}
                {topic.questionsCount === 1
                  ? "вопрос"
                  : topic.questionsCount < 5
                    ? "вопроса"
                    : "вопросов"}
              </Typography>
            </Box>
          </Box>

          {/* Progress indicator */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.85rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              📊 Готов к изучению
            </Typography>
          </Box>
        </Box>

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
            📖 Нажмите для изучения
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};