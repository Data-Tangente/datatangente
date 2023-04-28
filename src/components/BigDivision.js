import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Parallax } from "react-parallax";
import { useTranslation, Trans } from "next-i18next";

function BigDivision(props) {
  const { t } = useTranslation();
  const content = [
    {
      title: t("home.solutions.development"),
      subtitle: t("solutions.softwareBody"),

      body: "",
      justify: "flex-end",
      icon: "/assets/division2.png",
      bgImg: "/assets/bg_division2.jpg",
      href: "/solutions/#solution-section-icon-2",
      direction: "column",
      type: "icon-2",
    },
    {
      title: t("home.solutions.analysis"),
      subtitle: t("solutions.analysisBody"),
      body: "",
      justify: "flex-start",
      icon: "/assets/division1.png",
      bgImg: "/assets/bg_division1.jpg",
      href: "/solutions/#solution-section-icon-1",
      direction: "column",
      type: "icon-1",
    },
  ];
  const getContent = props.data ? props.data : content;

  return (
    <div className="big-division" style={{ width: "100%" }}>
      {getContent.map(
        (
          { title, subtitle, href, icon, bgImg, direction, alignText, type },
          index
        ) => {
          return (
            <Parallax
              key={title + "_" + index}
              bgImage={bgImg}
              bgImageAlt="solutions-division-bg-image"
              strength={400}
              className="section big-division-parallax">
              <Grid
                className="big-division-content max-width--"
                container
                direction={direction}>
                <Grid
                  className="big-division-text-container"
                  container
                  item
                  direction="column">
                  <a href={href} className="solutions-icon-container">
                    <img
                      alt="solutions-icon"
                      className={`solutions-icon ${type} ${alignText}`}
                      src={icon}
                    />
                    <Typography
                      variant="h5"
                      className="big-division-section-title">
                      {title}
                    </Typography>
                  </a>
                  <Typography className="big-division-section-subtitle">
                    {subtitle}
                  </Typography>
                </Grid>
              </Grid>
            </Parallax>
          );
        }
      )}
    </div>
  );
}

export default BigDivision;
