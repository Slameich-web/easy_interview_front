import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { Grid } from "../../../shared/ui/Grid";
import { QuestionCard } from "../../../shared/ui/QuestionCard";
import { useQuestions } from "../../../features/questions";
import { getTopicById } from "../../../features/topics/api/topicsApi";
import { Question } from "../../../shared/types/question";
import { Topic } from "../../../shared/types/topic";
import Button from "../../../shared/ui/Button";
import { 
  PageHeader, 
  PageHero, 
  EmptyState, 
  LoadingState 
} from "../../../shared/components";
import { NotFoundContainer, NotFoundTitle } from "../../../shared/ui/StyledComponents";
import { useState, useEffect } from "react";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const { questions, isLoading: questionsLoading, error: questionsError } = useQuestions(topicId || "");
  
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [topicLoading, setTopicLoading] = useState(false);
  const [topicError, setTopicError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopic = async () => {
      if (!topicId) return;
      
      setTopicLoading(true);
      setTopicError(null);
      
      try {
        const topic = await getTopicById(topicId);
        setCurrentTopic(topic);
      } catch (error) {
        console.error("Ошибка при загрузке темы:", error);
        setTopicError(error instanceof Error ? error.message : "Произошла ошибка");
      } finally {
        setTopicLoading(false);
      }
    };

    loadTopic();
  }, [topicId]);

  const isLoading = questionsLoading || topicLoading;

  const handleSelectQuestion = (question: Question) => {
    console.log("Отвечать на вопрос:", question.text);
    // TODO: navigate(`/question/${question.id}/answer`);
  };

  if (isLoading) {
    return <LoadingState message="Загружаем вопросы..." />;
  }

  if (!currentTopic && !topicLoading) {
    return (
      <NotFoundContainer>
        <NotFoundTitle variant="h4">
          {topicError ? "Ошибка загрузки темы" : "Тема не найдена"}
        </NotFoundTitle>
        {topicError && (
          <Alert severity="error" sx={{ mb: 2, maxWidth: "400px" }}>
            {topicError}
          </Alert>
        )}
        <Button
          variant="secondary"
          onClick={() => navigate("/study-plans")}
        >
          Вернуться к курсам
        </Button>
      </NotFoundContainer>
    );
  }

  if (!currentTopic) {
    return <LoadingState message="Загружаем тему..." />;
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
            {questions.map((question) => (
              <Grid key={question.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <QuestionCard
                  question={question}
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