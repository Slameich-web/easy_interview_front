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
import Button from "../../../shared/ui/Button";

const StudyPlansPage = () => {
  const navigate = useNavigate();
  const { email, userData } = useAuth();
  const { studyPlans, isLoading, error } = useStudyPlans();
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  const handleSelectPlan = (plan: StudyPlan) => {
    setSelectedPlan(selectedPlan?.id === plan.id ? null : plan);
  };

  const handleStartCourse = () => {
    if (selectedPlan) {
      // TODO: Навигация к началу курса
      console.log("Начать курс:", selectedPlan.name);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LoadingSpinner size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => navigate("/")}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ← Назад
                </Typography>
              </Box>
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.5px",
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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              mb: 2,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Выберите учебный план
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Изучайте новые технологии и развивайте свои навыки с нашими
            структурированными курсами
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              "& .MuiAlert-message": {
                color: "#d32f2f",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {studyPlans.length === 0 && !isLoading && (
          <Box textAlign="center" py={8}>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 2,
              }}
            >
              📝 Учебные планы пока не добавлены
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Скоро здесь появятся интересные курсы для изучения
            </Typography>
          </Box>
        )}

        <Grid container spacing={4}>
          {studyPlans.map((plan) => (
            <Grid key={plan.id} item xs={12} md={6} lg={4}>
              <StudyPlanCard
                studyPlan={plan}
                onSelect={handleSelectPlan}
                isSelected={selectedPlan?.id === plan.id}
              />
            </Grid>
          ))}
        </Grid>

        {selectedPlan && (
          <Box
            sx={{
              position: "fixed",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleStartCourse}
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.1rem",
                boxShadow: "0 8px 32px rgba(255, 107, 107, 0.4)",
              }}
            >
              🚀 Начать курс "{selectedPlan.name}"
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StudyPlansPage;