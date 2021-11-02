import React, { useState, useEffect } from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import Link from 'next/link';
import { Parallax } from 'react-parallax';

function BigDivision(props) {
    const content = [
        {
            title: 'ANÁLISIS DE DATOS',
            body: "Lorem ipsum dolor sit amet, consectetuer adipisc- ing elit,\
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\
            nulla facilisis at vero eros et accumsan et iusto odio.",
            justify: 'flex-start',
            icon:"/assets/division1.png",
            bgImg:"/assets/bg_division1.jpg",
            href:"/solutions/#solution-section-icon-1",
            direction: "row",
            alignText: 'left',
            type: 'icon-1',
        },
        {
            title: 'DESARROLLO DE SOFTWARE',
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, \
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \
            nulla facilisis at vero eros et accumsan et iusto odio.",
            justify: 'flex-end',
            icon:"/assets/division2.png",
            bgImg:"/assets/bg_division2.jpg",
            href:"/solutions/#solution-section-icon-2",
            direction: "row-reverse",
            alignText: 'right',
            type: 'icon-2',
        },
        {
            title: 'LÍNEA DE PROCESO',
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy \
            nibh euis- mod tincidunt ut laoreet dolore magna aliquam erat volutpat. nulla facilisis \
            at vero eros et accumsan et iusto odio",
            justify: 'flex-start',
            icon:"/assets/division3.png",
            bgImg:"/assets/bg_division3.jpg",
            href:"/solutions/#solution-section-icon-4",
            direction: "row",
            alignText: 'left',
            type: 'icon-3',
        },
    ]
    const getContent = props.data ? props.data : content;

    return(
        <Grid className="big-division" container style={{width:'100%'}}>
            {getContent.map(({title,href,icon,bgImg,direction,alignText,type}, index) => {
                return(
                    <Parallax key={title+"_"+index} bgImage={bgImg} bgImageAlt="solutions-division-bg-image" strength={400} style={{width:'100%', borderBottom: index !== content.length - 1 && '4px solid #fff'}}>
                    {/* <div className="big-division-section"  key={title+"_"+index} style={{position:'relative', background: `url(${bgImg}) no-repeat`, backgroundSize: '100%', width:'100%', borderBottom:'4px solid #fff'}}> */}
                        <div style={{position:'absolute', width:'100%', height:'100%', zIndex:10, backgroundColor:'rgb(0, 0, 0, .75)'}}></div>
                        <Grid className="big-division-content" container direction={direction}>
                            <img alt="solutions-icon" className={"solutions-icon" + " " + type} src={icon} />
                            <Grid className="big-division-text-container" container item direction="column" style={{padding:'0 3rem', textAlign:alignText}}>
                                <Typography  
                                    variant="h4"
                                    className="big-division-section-title"
                                >
                                    <a href={href}>{title}</a>
                                </Typography>
                                {/* <Typography 
                                    variant="body1"
                                    className="big-division-section-body"
                                    style={{marginTop:15, color:'#fff'}}
                                >
                                    {body}
                                </Typography> */}
                            </Grid>
                        </Grid>
                    {/* </div> */}
                    </Parallax>
                )
            })}
        </Grid>
    );
}

export default BigDivision;