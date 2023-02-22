import React from 'react';
import {Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function AboutUs() {
    const { t, i18n } = useTranslation();
    return (
        <Grid className="about-container" container style={{ width: "100%" }}>
        <div className="about-title">
            <Grid id="about-us" className="about-title-text-container">
            <Typography variant="h2" className="about-title-text">
                {t("aboutUs.title")}
            </Typography>
            </Grid>
        </div>
        <div className="about-body-container max-width--">
            <Typography
            variant="subtitle1"
            style={{
                marginTop: "2rem",
                color: "#424242",
                fontWeight: 700,
                textAlign: "center",
                fontSize: "1.6rem",
            }}>
            <span style={{ color: "#f05638" }}>Data Tangente</span>{" "}
            {t("aboutUs.dt1")}
            </Typography>
            <Typography
            variant="subtitle1"
            style={{
                marginTop: "2rem",
                color: "#424242",
                textAlign: "center",
                fontSize: "1.6rem",
            }}>
            {t("aboutUs.dt2")}
            </Typography>

            <div
            className="border-gradient horizontal"
            style={{ marginTop: "5rem" }}></div>
            <Grid
            container
            direction="row"
            justifyContent="space-between"
            className="vision-mision-container">
            <Grid
                id="mission"
                item
                container
                style={{ width: "45%" }}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <img
                alt="vision-icon"
                className="about-mision"
                style={{ paddingTop: "1rem" }}
                src="/assets/mision.png"
                />
                <Typography
                variant="h4"
                style={{
                    color: "#f05638",
                    letterSpacing: 4,
                    fontWeight: 500,
                    marginTop: "2rem",
                }}>
                {t("aboutUs.mission")}
                </Typography>
                <Typography
                variant="body1"
                style={{
                    marginTop: "2rem",
                    color: "#424242",
                    textAlign: "center",
                    fontSize: "1.6rem",
                    height: "20rem",
                }}>
                {t("aboutUs.missionDesc")}
                </Typography>
            </Grid>
            <div className="border-gradient vertical"></div>
            <Grid
                id="vission"
                item
                container
                style={{ width: "45%" }}
                direction="column"
                justifyContent="center"
                alignItems="center">
                <img
                alt="vision-icon"
                className="about-vision"
                style={{ paddingTop: "1rem" }}
                src="/assets/vision.png"
                />
                <Typography
                variant="h4"
                style={{
                    color: "#f05638",
                    letterSpacing: 4,
                    fontWeight: 500,
                    marginTop: "2rem",
                }}>
                {t("aboutUs.vision")}
                </Typography>
                <Typography
                variant="body1"
                style={{
                    marginTop: "2rem",
                    color: "#424242",
                    textAlign: "center",
                    fontSize: "1.6rem",
                    height: "20rem",
                }}>
                {t("aboutUs.visionDesc")}
                </Typography>
            </Grid>
            </Grid>
            <img
            id="values"
            alt="values-img"
            className="about-values-img"
            src={`/assets/about/${i18n.resolvedLanguage}/about_values.png`}
            />
            <div
            className="border-gradient horizontal small"
            style={{ marginTop: "5rem" }}></div>
            <img
            alt="values-img-small"
            className="about-values-img small"
            src={`/assets/about/${i18n.resolvedLanguage}/about_values_small.png`}
            />
        </div>
        </Grid>
    );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default AboutUs;
