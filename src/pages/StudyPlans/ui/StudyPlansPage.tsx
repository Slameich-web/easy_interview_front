import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { Grid } from "../../../shared/ui/Grid";
import { StudyPlanCard } from "../../../shared/ui/StudyPlanCard";
import { useStudyPlans } from "../../../features/studyPlans/hooks/useStudyPlans";
import { StudyPlan } from "../../../shared/types/studyPlan";
import { 
  PageHeader, 
  PageHero, 
  EmptyState, 
  LoadingState 
} from "../../../shared/components";

const StudyPlansPage = () => {
  const navigate = useNavigate();
  const { studyPlans, isLoading, error } = useStudyPlans();

  const handleSelectPlan = (plan: StudyPlan) => {
    navigate(`/course/${plan.id}`);
  };

  if (isLoading) {
    return <LoadingState message="Загружаем учебные планы..." />;
  }

  const heroStats = studyPlans.length > 0 ? [
    { icon: "📊", label: "Доступно курсов", value: studyPlans.length }
  ] : undefined;

  return (
    <>
      <PageHeader 
        title="Выбор курса" 
        icon="📚" 
        backTo="/" 
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <PageHero
          title="Выберите учебный план"
          subtitle="Изучайте новые технологии и развивайте свои навыки с нашими структурированными курсами"
          stats={heroStats}
        />

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
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
        )}

        {studyPlans.length === 0 && !error ? (
          <EmptyState
            icon="📝"
            title="Учебные планы пока не добавлены"
            description="Скоро здесь появятся интересные курсы для изучения. Следите за обновлениями!"
          />
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {studyPlans.map((plan) => (
              <Grid key={plan.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <StudyPlanCard
                  studyPlan={plan}
                  onSelect={handleSelectPlan}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default StudyPlansPage;