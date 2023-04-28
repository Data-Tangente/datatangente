import React from "react";
import { Typography, Grid } from "@material-ui/core";

function Division(props) {
  return (
    <Grid
      className="section"
      container
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        padding: "70px 0",
        backgroundColor: props.bgColor,
      }}>
      <Typography
        variant="h4"
        style={{
          fontStyle: "italic",
          color: props.textColor,
          letterSpacing: 8,
        }}
        className="division-text-container max-width--">
        <span className="division-text" style={{ fontWeight: 700 }}>
          {props.boldText}&nbsp;
        </span>
        <span className="division-text body" style={{ fontWeight: 300 }}>
          {props.normalText}
        </span>
      </Typography>
    </Grid>
  );
}

export default Division;
