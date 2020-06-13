import React from "react";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import CreateExamLogo from "../../assets/onboarding/undraw_create_f05x.svg";
import ShareExamLogo from "../../assets/onboarding/undraw_publish_post_vowb.svg";
import ReviewExamLogo from "../../assets/onboarding/undraw_reviewed_docs_neeb.svg";
import { useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

export default function AutoRotatingCarouselModal (props) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <AutoRotatingCarousel
        label={t("get_stated")}
        open={props.open}
        onClose={() => props.cookiesOnBoarding()}
        onStart={() => props.cookiesOnBoarding()}
        autoplay={true}
        ButtonProps={{ style: { backgroundColor: "#bdc1db", color: theme.palette.primary.main, } }}
        mobile={props.isMobile}
        style={{ position: "absolute" }}
      >
        <Slide
          media={
            <img src={CreateExamLogo}/>
          }
          mediaBackgroundStyle={{ backgroundColor: theme.palette.primary.main }}
          style={{ backgroundColor: theme.palette.primary.main, padding: theme.spacing(2) }}
          title={t("create_your_exams.title")}
          subtitle={t("create_your_exams.subtitle")}
        />
        <Slide
          media={
            <img src={ShareExamLogo}/>
          }
          mediaBackgroundStyle={{ backgroundColor: theme.palette.primary.main }}
          style={{ backgroundColor: theme.palette.primary.main, padding: theme.spacing(2) }}
          title={t("publish_your_exams.title")}
          subtitle={t("publish_your_exams.subtitle")}
        />
        <Slide
          media={
            <img src={ReviewExamLogo}/>
          }
          mediaBackgroundStyle={{ backgroundColor: theme.palette.primary.main }}
          style={{ backgroundColor: theme.palette.primary.main, padding: theme.spacing(2) }}
          title={t("review_your_exams.title")}
          subtitle={t("review_your_exams.subtitle")}
        />
      </AutoRotatingCarousel>
    </div>
  );
};
