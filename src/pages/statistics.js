import React, {useState} from 'react';
import {Typography, Grid } from '@material-ui/core';
import AccordionContainer from '../components/Accordion';
import { makeStyles } from '@material-ui/core/styles';
import MainTheme from '../themes/mainTheme';
import StatisticsReports from '../functions/statistics';

const theme = MainTheme();

const useStyles = makeStyles(() => ({
    banner: {
        background: `url("/assets/statistics/statistics_banner.jpg") no-repeat`,
        backgroundSize: 'cover',
    },
    overlay: {
        position: 'absolute', 
        width:'100%', 
        height:'100%', 
        backgroundColor:'black', 
        opacity:'.7', 
        zIndex:1,
    },
    title: {
        fontWeight:600,
        letterSpacing:10
    },
    bodyTitle: {
        fontWeight:600,
        margin: '10px 0 30px 0',
    },
}));

function Statistics() {
    const classes = useStyles();
    const statistics = StatisticsReports();
    const [active, setActive] = useState(null);
    return(
        <Grid container style={{width:'100%', margin:'0 auto', position:'relative'}}>
            <div className={`page-rec-banner ${classes.banner}`}>
                <div className={classes.overlay} />
                <div className="max-width--" style={{zIndex:2}}>
                    <Typography  
                        variant="h3"
                        className={classes.title}
                        style={{color:theme.colors.primary}}
                    >
                        ESTADÍSTICAS
                    </Typography>
                    <Typography  
                        variant="h4"
                        className={classes.title}
                        style={{color:'#fff'}}
                    >
                        INSTITUCIONES PÚBLICAS
                    </Typography>
                </div>
            </div>
            <div style={{margin: '0 auto', paddingBottom: 40}} className="max-width--">
                <Typography  
                    variant="h6"
                    className={classes.bodyTitle}
                    style={{color:theme.colors.black}}
                >
                    ESTADÍSTICAS DE INSTITUCIONES PÚBLICAS
                </Typography>
                {
                    statistics.map(item => {
                        return(
                            <Grid 
                                key={`${item.name} - ${item.index}`} 
                                style={{width:'100%', margin:'20px 0'}}
                            >
                                <AccordionContainer
                                    title={item.title}
                                    subTitle={item.subTitle}
                                    description={item.description}
                                    name={item.name}
                                    source={item.source}
                                    setActive={setActive}
                                    active={active}
                                >
                                    <iframe 
                                        src={item.graphicSrc}
                                        style={{width: '100%', height:'800px', marginTop:'20px'}}
                                    ></iframe>
                                </AccordionContainer>
                            </Grid>
                        )
                    })
                }
            </div>
        </Grid>
    );
}

export default Statistics;