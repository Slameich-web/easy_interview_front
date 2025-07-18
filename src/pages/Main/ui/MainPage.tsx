import { Typography, Box, CardContent } from "@mui/material";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { Container } from "../../../shared/ui/Container";
import { Card } from "../../../shared/ui/Card";
import { Grid } from "../../../shared/ui/Grid";
import Button from "../../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../shared/components";

const MainPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  if (!isAuth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <LoadingSpinner size={60} />
      </Box>
    );
  }

  const features = [
    {
      icon: "🎯",
      title: "Умные Вопросы",
      description:
        "Автоматически генерируемые вопросы на основе технологий и уровня сложности. Адаптивная система подбора заданий.",
    },
    {
      icon: "📊",
      title: "Аналитика",
      description:
        "Подробная статистика по результатам собеседований. Отслеживайте прогресс и выявляйте области для улучшения.",
    },
    {
      icon: "⚡",
      title: "Быстрый Старт",
      description:
        "Начните собеседование за несколько кликов. Интуитивный интерфейс и готовые шаблоны для разных ролей.",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <PageHeader title="Easy Interview" showBackButton={false} />

      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 2 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              mb: 3,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            Добро пожаловать в Easy Interview!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 5,
              lineHeight: 1.6,
              fontWeight: 400,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Платформа для проведения технических собеседований с современными
            инструментами и удобным интерфейсом. Создавайте, проводите и
            анализируйте интервью легко и эффективно.
          </Typography>
        </Box>

        <Grid
          container
          display="flex"
          justifyContent="center"
          spacing={4}
          sx={{ mb: 8 }}
        >
          {features.map((feature, index) => (
            <Grid key={index} sx={{ mb: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  animation: `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1)}s both`,
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "3rem",
                      mb: 2.5,
                      display: "block",
                    }}
                  >
                    {feature.icon}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#ffffff",
                      mb: 1.5,
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          display="flex"
          gap={3}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          sx={{
            animation: "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both",
            "& > *": {
              minWidth: { xs: "100%", sm: "auto" },
              maxWidth: { xs: "280px", sm: "none" },
            },
          }}
        >
          <Button variant="primary" size="large">
            🚀 Начать Собеседование
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => navigate("/study-plans")}
          >
            📋 Мои Интервью
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => navigate("/study-plans")}
          >
            📚 Выбрать курс
          </Button>
          <Button variant="secondary" size="large">
            ⚙️ Настройки
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
