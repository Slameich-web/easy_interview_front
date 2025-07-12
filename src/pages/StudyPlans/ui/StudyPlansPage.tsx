import { useState } from "react";
import { Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { AppBar } from "../../../shared/ui/AppBar";
import { Toolbar } from "../../../shared/ui/Toolbar";
import { Grid } from "../../../shared/ui/Grid";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { StudyPlanCard } from "../../../shared/ui/StudyPlanCard";
import { LogoutButton } from "../../../features/auth";
import { UserChips } from "../../../shared/ui/UserChips";
import { IconButton } from "../../../shared/ui/IconButton";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useStudyPlans } from "../../../features/studyPlans/hooks/useStudyPlans";
import { StudyPlan } from "../../../shared/types/studyPlan";

const StudyPlansPage = () => {
  const navigate = useNavigate();
  const { email, userData } = useAuth();
  const { studyPlans, isLoading, error } = useStudyPlans();

  const handleSelectPlan = (plan: StudyPlan) => {
    navigate(`/course/${plan.id}`);
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
          Загружаем учебные планы...
        </Typography>
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
              onClick={() => navigate("/")}
              sx={{
                minWidth: "auto",
                px: 2,
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
              }}
            >
              📚 Выбор курса
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <UserChips email={email!} userData={userData} />
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
            Выберите учебный план
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 2,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 400,
            }}
          >
            Изучайте новые технологии и развивайте свои навыки с нашими
            структурированными курсами
          </Typography>

          {/* Stats */}
          {studyPlans.length > 0 && (
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
                📊 Доступно курсов: {studyPlans.length}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Error State */}
        {error && (
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
              {error}
            </Alert>
          </Box>
        )}

        {/* Empty State */}
        {studyPlans.length === 0 && !isLoading && !error && (
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
              📝 Учебные планы пока не добавлены
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
              Скоро здесь появятся интересные курсы для изучения. Следите за
              обновлениями!
            </Typography>
          </Box>
        )}

        {/* Courses Grid */}
        {studyPlans.length > 0 && (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {studyPlans.map((plan) => (
              <Grid key={plan.id} spacing={{ xs: 12, sm: 6, lg: 4 }}>
                <StudyPlanCard
                  studyPlan={plan}
                  onSelect={handleSelectPlan}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default StudyPlansPage;
