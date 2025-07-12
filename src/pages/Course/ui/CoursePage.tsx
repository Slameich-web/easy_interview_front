import { useState } from "react";
import { Typography, Box, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { AppBar } from "../../../shared/ui/AppBar";
import { Toolbar } from "../../../shared/ui/Toolbar";
import { Grid } from "../../../shared/ui/Grid";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { TopicCard } from "../../../shared/ui/TopicCard";
import { LogoutButton } from "../../../features/auth";
import { UserChips } from "../../../shared/ui/UserChips";
import { IconButton } from "../../../shared/ui/IconButton";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useTopics } from "../../../features/topics";
import { useStudyPlans } from "../../../features/studyPlans";
import { Topic } from "../../../shared/types/topic";
import Button from "../../../shared/ui/Button";

const CoursePage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();
  const { email, userData } = useAuth();
  const { topics, isLoading: topicsLoading, error: topicsError } = useTopics(planId || "");
  const { studyPlans, isLoading: plansLoading } = useStudyPlans();

  const currentPlan = studyPlans.find(plan => plan.id === planId);
  const isLoading = topicsLoading || plansLoading;

  const handleSelectTopic = (topic: Topic) => {
    // TODO: Навигация к изучению темы/вопросам
    console.log("Начать изучение темы:", topic.name);
    // navigate(`/topic/${topic.id}/questions`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <LoadingSpinner size={60} />
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Загружаем темы курса...
        </Typography>
      </Box>
    );
  }

  if (!currentPlan) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Курс не найден
        </Typography>
        <Button
          variant="secondary"
          onClick={() => navigate("/study-plans")}
        >
          Вернуться к курсам
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => navigate("/study-plans")}
              sx={{
                minWidth: "auto",
                px: { xs: 1, sm: 2 },
                py: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                }}
              >
                ← Назад
              </Typography>
            </IconButton>

            <Box
              sx={{
                width: "2px",
                height: "24px",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "1px",
                display: { xs: "none", sm: "block" },
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              }}
            >
              📖 {currentPlan.name}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <UserChips email={email!} userData={userData} />
            </Box>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              mb: 2,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Темы курса
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 3,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 400,
            }}
          >
            {currentPlan.description}
          </Typography>

          {/* Stats */}
          {topics.length > 0 && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: 600,
                  }}
                >
                  📚 Тем: {topics.length}
                </Typography>
              </Box>
              
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: 600,
                  }}
                >
                  ❓ Всего вопросов: {topics.reduce((sum, topic) => sum + topic.questionsCount, 0)}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Error State */}
        {topicsError && (
          <Box sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}>
            <Alert
              severity="error"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                "& .MuiAlert-message": {
                  color: "#d32f2f",
                  fontWeight: 500,
                },
                "& .MuiAlert-icon": {
                  color: "#d32f2f",
                },
              }}
            >
              {topicsError}
            </Alert>
          </Box>
        )}

        {/* Empty State */}
        {topics.length === 0 && !isLoading && !topicsError && (
          <Box
            textAlign="center"
            py={{ xs: 6, md: 10 }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 2,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              📝 Темы для этого курса пока не добавлены
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "400px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Скоро здесь появятся интересные темы для изучения. Следите за
              обновлениями!
            </Typography>
          </Box>
        )}

        {/* Topics Grid */}
        {topics.length > 0 && (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {topics.map((topic) => (
              <Grid key={topic.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <TopicCard
                  topic={topic}
                  onSelect={handleSelectTopic}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CoursePage;