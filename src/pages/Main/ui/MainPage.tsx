import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, CardContent } from "@mui/material";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LogoutButton } from "../../../features/auth";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { Container } from "../../../shared/ui/Container";
import { AppBar } from "../../../shared/ui/AppBar";
import { Toolbar } from "../../../shared/ui/Toolbar";
import { Card } from "../../../shared/ui/Card";
import { Grid } from "../../../shared/ui/Grid";
import { Chip } from "../../../shared/ui/Chip";
import Button from "../../../shared/ui/Button";

const MainPage = () => {
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      >
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
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.5px",
            }}
          >
            Easy Interview
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Chip label={email} />
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

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

        <Grid container spacing={4} sx={{ mb: 8 }}>
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
          <Button variant="secondary" size="large">
            📋 Мои Интервью
          </Button>
          <Button variant="secondary" size="large">
            ⚙️ Настройки
          </Button>
        </Box>
      </Container>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default MainPage;
