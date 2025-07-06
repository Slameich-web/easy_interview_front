import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LogoutButton } from "../../../features/auth";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.MainPage}>
      <header className={styles.Header}>
        <div className={styles.Logo}>
          Easy Interview
        </div>
        <div className={styles.UserInfo}>
          <div className={styles.UserEmail}>
            {email}
          </div>
          <div className={styles.LogoutButtonWrapper}>
            <LogoutButton userEmail={email} />
          </div>
        </div>
      </header>

      <main className={styles.Content}>
        <section className={styles.WelcomeSection}>
          <h1 className={styles.MainTitle}>
            Добро пожаловать в Easy Interview!
          </h1>
          <p className={styles.Subtitle}>
            Платформа для проведения технических собеседований с современными инструментами 
            и удобным интерфейсом. Создавайте, проводите и анализируйте интервью легко и эффективно.
          </p>
        </section>

        <section className={styles.FeatureGrid}>
          <div className={styles.FeatureCard}>
            <span className={styles.FeatureIcon}>🎯</span>
            <h3 className={styles.FeatureTitle}>Умные Вопросы</h3>
            <p className={styles.FeatureDescription}>
              Автоматически генерируемые вопросы на основе технологий и уровня сложности. 
              Адаптивная система подбора заданий.
            </p>
          </div>

          <div className={styles.FeatureCard}>
            <span className={styles.FeatureIcon}>📊</span>
            <h3 className={styles.FeatureTitle}>Аналитика</h3>
            <p className={styles.FeatureDescription}>
              Подробная статистика по результатам собеседований. Отслеживайте прогресс 
              и выявляйте области для улучшения.
            </p>
          </div>

          <div className={styles.FeatureCard}>
            <span className={styles.FeatureIcon}>⚡</span>
            <h3 className={styles.FeatureTitle}>Быстрый Старт</h3>
            <p className={styles.FeatureDescription}>
              Начните собеседование за несколько кликов. Интуитивный интерфейс 
              и готовые шаблоны для разных ролей.
            </p>
          </div>
        </section>

        <section className={styles.ActionSection}>
          <button className={`${styles.ActionButton} ${styles.PrimaryButton}`}>
            🚀 Начать Собеседование
          </button>
          <button className={`${styles.ActionButton} ${styles.SecondaryButton}`}>
            📋 Мои Интервью
          </button>
          <button className={`${styles.ActionButton} ${styles.SecondaryButton}`}>
            ⚙️ Настройки
          </button>
        </section>
      </main>
    </div>
  );
};

export default MainPage;