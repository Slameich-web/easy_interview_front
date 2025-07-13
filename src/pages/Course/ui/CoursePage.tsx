import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { Grid } from "../../../shared/ui/Grid";
import { TopicCard } from "../../../shared/ui/TopicCard";
import { useTopics } from "../../../features/topics";
import { useStudyPlans } from "../../../features/studyPlans";
import { Topic } from "../../../shared/types/topic";
import Button from "../../../shared/ui/Button";
import { 
  PageHeader, 
  PageHero, 
  EmptyState, 
  LoadingState 
} from "../../../shared/components";
import { NotFoundContainer, NotFoundTitle } from "../../../shared/ui/StyledComponents";

const CoursePage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();
  const { topics, isLoading: topicsLoading, error: topicsError } = useTopics(planId || "");
  const { studyPlans, isLoading: plansLoading } = useStudyPlans();

  const currentPlan = studyPlans.find(plan => plan.id === planId);
  const isLoading = topicsLoading || plansLoading;

  const handleSelectTopic = (topic: Topic) => {
    navigate(`/topic/${topic.id}/questions`);
  };

  if (isLoading) {
    return <LoadingState message="Загружаем темы курса..." />;
  }

  if (!currentPlan) {
    return (
      <NotFoundContainer>
        <NotFoundTitle variant="h4">
          Курс не найден
        </NotFoundTitle>
        <Button
          variant="secondary"
          onClick={() => navigate("/study-plans")}
        >
          Вернуться к курсам
        </Button>
      </NotFoundContainer>
    );
  }

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questionsCount, 0);
  const heroStats = topics.length > 0 ? [
    { icon: "📚", label: "Тем", value: topics.length },
    { icon: "❓", label: "Всего вопросов", value: totalQuestions }
  ] : undefined;

  return (
    <>
      <PageHeader 
        title={currentPlan.name} 
        icon="📖" 
        backTo="/study-plans" 
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <PageHero
          title="Темы курса"
          subtitle={currentPlan.description}
          stats={heroStats}
        />

        {topicsError && (
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
            {topicsError}
          </Alert>
        )}

        {topics.length === 0 && !topicsError ? (
          <EmptyState
            icon="📝"
            title="Темы для этого курса пока не добавлены"
            description="Скоро здесь появятся интересные темы для изучения. Следите за обновлениями!"
          />
        ) : (
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
    </>
  );
};

export default CoursePage;