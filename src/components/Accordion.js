import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import MainTheme from '../themes/mainTheme';

const theme = MainTheme();

const useStyles = makeStyles(() => ({
    toolbar: {
        backgroundColor: theme.colors.grey,
        color: theme.colors.blackLight,
        width:'100%',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '9px 48px',
        width: '100%',
        textAlign: 'left',
        border: 'none',
        borderRadius:4,
        outline: 'none',
        transition: '.2s linear',
        "&:hover": {
            backgroundColor: theme.colors.grey,
        },
    },
    icon: {
        fontSize: 24,
        transition: '.2s linear',
        color: '#f29913',
    },
    iconActive: {
        transform: "rotate(90deg)"
    },
    active: {
        backgroundColor: theme.colors.grey,
    },
    content: {
        padding: '0 18px',
        textAlign:'left',
        height: 'auto',
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 0.2s linear',
    },
    source: {
        background: 'linear-gradient(180deg, rgba(56,210,240,0.1951374299719888) 45%, rgba(56,188,240,0.3772102591036415) 98%)',
        borderRadius: 4,
        borderBottom: '1px solid #38bcf0',
        padding:3,
    }

}));

function AccordionContainer({
    title, description, name, source, 
    children, subTitle, active, setActive
}) {

    const classes = useStyles();
    const contentEl = useRef('');
    // const [active, setActive] = useState({});
    const handleAccordionExpand = () => {
        // setActive({...active, [name]: Boolean(!active[name])});
            setActive(active === name ? null : name);
            if(contentEl.current.style.maxHeight) {
                contentEl.current.style.maxHeight = null;
            }else{
                contentEl.current.style.maxHeight = `${contentEl.current.scrollHeight}px`;
            }
    }

    useEffect(() => {
        if(active !== name) {
            contentEl.current.style.maxHeight = null;

        }
    }, [active]);
    
    return(
        <>
            <Grid 
                container 
                justifyContent='space-between'
                alignItems='center'
                // className={`${classes.toolbar} ${active[name] ? classes.active : ""}`}
                className={`${classes.toolbar} ${active === name ? classes.active : ""}`}
                onClick={handleAccordionExpand}
            >   
                <span>{title} - {subTitle}</span>
                <Icon
                    // className={`${classes.icon} ${active[name] ? classes.iconActive : ""}`}
                    className={`${classes.icon} ${active === name ? classes.iconActive : ""}`}
                    icon={faCaretRight} 
                />
            </Grid>
            <div className={classes.content} ref={contentEl}>
                <div style={{margin:'20px', padding:'50px', backgroundColor: theme.colors.greyLight,}}>
                    <span style={{fontWeight:'bold', color: theme.colors.blackLight}}>Sobre esta sección</span>
                    <p> {description} </p>
                    <a target="_blank" rel='noreferer' className={classes.source} href={source}>Ir a la fuente</a>
                    {children}
                </div>
            </div>
        </>
    );
}

export default AccordionContainer;