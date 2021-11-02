import React, { useState, useEffect } from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';

function Division(props) {
    return(
        <Grid container alignItems="center" justify="center" style={{width:'100%', padding:'70px 0', backgroundColor:props.bgColor}}>
            <Typography
                variant="h4"
                style={{fontStyle:'italic', color:props.textColor, letterSpacing:8}}
                className="division-text-container"
            >
                <span className="division-text" style={{fontWeight:700}}>{props.boldText}&nbsp;</span>
                <span className="division-text body" style={{fontWeight:300}}>{props.normalText}</span>
            </Typography>
        </Grid>
    );
}

export default Division;