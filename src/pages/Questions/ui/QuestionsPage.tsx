import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { Grid } from "../../../shared/ui/Grid";
import { QuestionCard } from "../../../shared/ui/QuestionCard";
import { useQuestions } from "../../../features/questions";
import { useTopics } from "../../../features/topics";
import { Question } from "../../../shared/types/question";
import Button from "../../../shared/ui/Button";
import { 
  PageHeader, 
  PageHero, 
  EmptyState, 
  LoadingState 
} from "../../../shared/components";
import { NotFoundContainer, NotFoundTitle } from "../../../shared/ui/StyledComponents";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const { questions, isLoading: questionsLoading, error: questionsError } = useQuestions(topicId || "");
  const { topics, isLoading: topicsLoading } = useTopics("");

  const currentTopic = topics.find(topic => topic.id === topicId);
  const isLoading = questionsLoading || topicsLoading;

  const handleSelectQuestion = (question: Question) => {
    console.log("Отвечать на вопрос:", question.text);
    // TODO: navigate(`/question/${question.id}/answer`);
  };

  if (isLoading) {
    return <LoadingState message="Загружаем вопросы..." />;
  }

  if (!currentTopic) {
    return (
      <NotFoundContainer>
        <NotFoundTitle variant="h4">
          Тема не найдена
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

  const heroStats = questions.length > 0 ? [
    { icon: "❓", label: "Всего вопросов", value: questions.length },
    { 
      icon: "📊", 
      label: "Сложность", 
      value: questions.length > 0 ? "Смешанная" : "—" 
    }
  ] : undefined;

  return (
    <>
      <PageHeader 
        title={currentTopic.name} 
        icon="❓" 
        backTo={`/course/${currentTopic.planId}`}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <PageHero
          title="Вопросы по теме"
          subtitle="Выберите вопрос для ответа и проверки знаний"
          stats={heroStats}
        />

        {questionsError && (
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
            {questionsError}
          </Alert>
        )}

        {questions.length === 0 && !questionsError ? (
          <EmptyState
            icon="❓"
            title="Вопросы для этой темы пока не добавлены"
            description="Скоро здесь появятся интересные вопросы для проверки знаний. Следите за обновлениями!"
          />
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {questions.map((question, index) => (
              <Grid key={question.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <QuestionCard
                  question={question}
                  questionNumber={index + 1}
                  onSelect={handleSelectQuestion}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default QuestionsPage;