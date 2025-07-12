import {
  PageHeroContainer,
  PageTitle,
  PageSubtitle,
  StatsContainer,
  StatsBadge,
  StatsText,
} from "../../ui/StyledComponents";

interface StatItem {
  icon: string;
  label: string;
  value: number | string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  stats?: StatItem[];
}

export const PageHero = ({ title, subtitle, stats }: PageHeroProps) => {
  return (
    <PageHeroContainer>
      <PageTitle variant="h2">{title}</PageTitle>
      
      {subtitle && (
        <PageSubtitle variant="h6">{subtitle}</PageSubtitle>
      )}

      {stats && stats.length > 0 && (
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatsBadge key={index}>
              <StatsText>
                {stat.icon} {stat.label}: {stat.value}
              </StatsText>
            </StatsBadge>
          ))}
        </StatsContainer>
      )}
    </PageHeroContainer>
  );
};