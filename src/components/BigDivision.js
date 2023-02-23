import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Parallax } from "react-parallax";
import { useTranslation, Trans } from "next-i18next";

function BigDivision(props) {
  const { t } = useTranslation();
  const content = [
    {
      title: t("home.solutions.development"),
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
        ({ title, href, icon, bgImg, direction, alignText, type }, index) => {
          return (
            <Parallax
              key={title + "_" + index}
              bgImage={bgImg}
              bgImageAlt="solutions-division-bg-image"
              strength={400}
              style={{
                width: "100%",
                borderRight: index !== content.length - 1 && "4px solid #fff",
              }}>
              {/* <div className="big-division-section"  key={title+"_"+index} style={{position:'relative', background: `url(${bgImg}) no-repeat`, backgroundSize: '100%', width:'100%', borderBottom:'4px solid #fff'}}> */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100vh",
                  zIndex: 10,
                  backgroundColor: "rgb(0, 0, 0, .75)",
                }}></div>
              <Grid
                className="big-division-content max-width--"
                container
                direction={direction}>
                <img
                  alt="solutions-icon"
                  className={`solutions-icon ${type} ${alignText}`}
                  src={icon}
                />
                <Grid
                  className="big-division-text-container"
                  container
                  item
                  direction="column"
                  style={{ padding: "0 3rem" }}>
                  <Typography
                    variant="h5"
                    className="big-division-section-title">
                    <a href={href}>{title}</a>
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
