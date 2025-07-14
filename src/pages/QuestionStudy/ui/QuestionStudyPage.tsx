import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Container } from "../../../shared/ui/Container";
import { Card } from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import { getQuestionById } from "../../../features/questions/api/questionsApi";
import { getTopicById } from "../../../features/topics/api/topicsApi";
import { useProgress } from "../../../features/progress";
import {
  Question,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  DifficultyLevel,
} from "../../../shared/types/question";
import { Topic } from "../../../shared/types/topic";
import { PageHeader, LoadingState } from "../../../shared/components";
import {
  NotFoundContainer,
  NotFoundTitle,
} from "../../../shared/ui/StyledComponents";

const QuestionStudyPage = () => {
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();

  const [question, setQuestion] = useState<Question | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  const {
    progress,
    submitAnswer,
    getAnswerForQuestion,
    resetQuestionProgress,
  } = useProgress(topic?.id || "");

  useEffect(() => {
    const loadQuestionAndTopic = async () => {
      if (!questionId) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log("Загружаем вопрос:", questionId);
        const questionData = await getQuestionById(questionId);

        if (!questionData) {
          setError("Вопрос не найден");
          return;
        }

        setQuestion(questionData);

        // Загружаем тему
        const topicData = await getTopicById(questionData.topicId);
        setTopic(topicData);

        console.log("Загружены данные:", {
          question: questionData,
          topic: topicData,
        });
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
        setError(error instanceof Error ? error.message : "Произошла ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionAndTopic();
  }, [questionId]);

  // Проверяем, отвечал ли пользователь на этот вопрос
  useEffect(() => {
    if (question) {
      const existingAnswer = getAnswerForQuestion(question.id);
      if (existingAnswer) {
        setUserAnswer(existingAnswer.isCorrect);
        setShowAnswer(true);
      }
    }
  }, [question, getAnswerForQuestion]);

  const handleAnswerSubmit = async (isCorrect: boolean) => {
    if (!question || !topic) return;

    try {
      setUserAnswer(isCorrect);
      await submitAnswer(question.id, isCorrect);
      setShowAnswer(true);
    } catch (error) {
      console.error("Ошибка при сохранении ответа:", error);
      // Можно показать уведомление об ошибке
    }
  };
  const handleResetQuestionProgress = async () => {
    if (!question || !topic) return;

    try {
      await resetQuestionProgress(question.id);
      // Опционально: сбросить локальное состояние
      setUserAnswer(null);
      setShowAnswer(false);

      // Можно добавить уведомление об успешном сбросе
      console.log("Прогресс по вопросу сброшен");
    } catch (error) {
      console.error("Ошибка при сбросе прогресса:", error);
      // Можно показать уведомление об ошибке
    }
  };
  const handleBackToQuestions = () => {
    if (topic) {
      navigate(`/topic/${topic.id}/questions`);
    }
  };

  if (isLoading) {
    return <LoadingState message="Загружаем вопрос..." />;
  }

  if (error || !question || !topic) {
    return (
      <NotFoundContainer>
        <NotFoundTitle variant="h4">
          {error || "Вопрос не найден"}
        </NotFoundTitle>
        <Button variant="secondary" onClick={() => navigate("/study-plans")}>
          Вернуться к курсам
        </Button>
      </NotFoundContainer>
    );
  }

  const difficultyColor =
    DIFFICULTY_COLORS[question.difficulty as DifficultyLevel] || "#757575";
  const difficultyLabel =
    DIFFICULTY_LABELS[question.difficulty as DifficultyLevel] ||
    question.difficulty;

  return (
    <>
      <PageHeader
        title={`Вопрос #${question.queue}`}
        icon="💡"
        backTo={`/topic/${topic.id}/questions`}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Основная информация о вопросе */}
        <Card sx={{ mb: 4, p: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                flex: 1,
                mr: 2,
              }}
            >
              Вопрос #{question.queue}
            </Typography>

            <Chip
              label={difficultyLabel}
              sx={{
                backgroundColor: difficultyColor,
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.875rem",
                height: "32px",
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              mb: 3,
            }}
          >
            {question.text}
          </Typography>
        </Card>

        {/* Обучающие материалы */}
        {(question.educationalMaterialsText ||
          question.educationalMaterialsLinks.length > 0) && (
          <Card sx={{ mb: 4, p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📚 Материалы для изучения
            </Typography>

            {question.educationalMaterialsText && (
              <Paper
                sx={{
                  p: 3,
                  mb: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.7,
                    fontSize: "1rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {question.educationalMaterialsText}
                </Typography>
              </Paper>
            )}

            {question.educationalMaterialsLinks.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  🔗 Полезные ссылки:
                </Typography>

                <List>
                  {question.educationalMaterialsLinks.map((link, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        mb: 1,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <ListItemIcon>
                        <Typography sx={{ fontSize: "1.2rem" }}>🌐</Typography>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          component="a"
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "#64b5f6",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#90caf9",
                            },
                          }}
                        >
                          {link}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Card>
        )}
        <Card sx={{ mb: 4, p: { xs: 3, md: 4 } }}>
          {/* Кнопки для ответа */}
          {!showAnswer && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="primary"
                size="large"
                onClick={() => handleAnswerSubmit(true)}
                sx={{ minWidth: "200px" }}
              >
                ✅ Знаю ответ
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => handleAnswerSubmit(false)}
                sx={{ minWidth: "200px" }}
              >
                ❌ Не знаю
              </Button>
            </Box>
          )}

          {/* Результат ответа */}
          {showAnswer && userAnswer !== null && (
            <Alert
              severity={userAnswer ? "success" : "info"}
              sx={{
                backgroundColor: userAnswer
                  ? "rgba(76, 175, 80, 0.2)"
                  : "rgba(33, 150, 243, 0.2)",
                borderRadius: "16px",
                "& .MuiAlert-message": {
                  color: "#ffffff",
                  fontWeight: 500,
                },
                "& .MuiAlert-icon": {
                  color: "#ffffff",
                },
              }}
            >
              {userAnswer
                ? "Отлично! Вы знали ответ на этот вопрос."
                : "Не беспокойтесь! Изучите материалы ниже и попробуйте еще раз."}
            </Alert>
          )}
        </Card>
        {/* Эталонный ответ */}
        {showAnswer && question.modelAnswer && (
          <Card sx={{ mb: 4, p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              💡 Эталонный ответ
            </Typography>

            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                borderRadius: "16px",
                border: "1px solid rgba(76, 175, 80, 0.3)",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {question.modelAnswer}
              </Typography>
            </Paper>
          </Card>
        )}

        {/* Статистика прогресса */}
        {progress && (
          <Card sx={{ mb: 4, p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#ffffff",
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📊 Ваш прогресс по теме
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  p: 2,
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#4caf50", fontWeight: 700 }}
                >
                  {progress.score}%
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Общий счет
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  p: 2,
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#2196f3", fontWeight: 700 }}
                >
                  {Object.keys(progress.answers).length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Отвечено
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  p: 2,
                  minWidth: "120px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#ff9800", fontWeight: 700 }}
                >
                  {
                    Object.values(progress.answers).filter((a) => a.isCorrect)
                      .length
                  }
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  Правильно
                </Typography>
              </Box>
            </Box>
          </Card>
        )}

        {/* Навигация */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="secondary"
            size="large"
            onClick={handleBackToQuestions}
          >
            ← Вернуться к вопросам
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={handleResetQuestionProgress}
          >
            Сбросить прогресс
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default QuestionStudyPage;
