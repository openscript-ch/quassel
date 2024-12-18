import image from "./HeroSection.svg";
import classes from "./HeroSection.module.css";
import { Button, Container, Group, Text, Title } from "@quassel/ui";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";
import { Link } from "@tanstack/react-router";

const messages = i18n("heroSection", {
  title: "Quassel",
  subtitle: "Gather language exposure",
  toFormAction: "Questionnaire",
  toAdminAction: "Administration",
});

export function HeroSection() {
  const t = useStore(messages);
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>{t.title}</span>
          </Title>
          <Text c="dimmed" mt="md">
            {t.subtitle}
          </Text>

          <Group mt={30}>
            <Button size="md" renderRoot={(props) => <Link to="/questionnaire" {...props} />}>
              {t.toFormAction}
            </Button>
            <Button variant="default" size="md" renderRoot={(props) => <Link to="/administration" {...props} />}>
              {t.toAdminAction}
            </Button>
          </Group>
        </div>
        <img src={image} alt="Quassel family" className={classes.image} />
      </div>
    </Container>
  );
}
