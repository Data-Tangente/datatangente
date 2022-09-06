import React from 'react';
import {Typography, Grid } from '@material-ui/core';
import { Parallax } from 'react-parallax';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Solutions(props) {
    const { t, i18n } = useTranslation();
    const content = [
        {
            title: t('solutions.analysis'),
            bodyQuote: t('solutions.analysisQuote'),
            body: t('solutions.analysisBody'),
            icon:"/assets/division1.png",
            bgImg:"/assets/bg_division1.jpg",
            direction: "column",
            type: 'icon-1',
        },
        {
            title:t('solutions.softwareDev'),
            bodyQuote:t('solutions.softwareQuote'),
            body:t('solutions.softwareBody'),
            icon:"/assets/division2.png",
            bgImg:"/assets/bg_division2.jpg",
            type: 'icon-2',
        },
        // {
        //     title: 'PRODUCTOS',
        //     bodyQuote: `"..."`,
        //     body: ". . .",
        //     icon:"/assets/solutions/division3.png",
        //     bgImg:"/assets/solutions/bg_division3.jpg",
        //     type: 'icon-3',
        // },
        {
            title:t('solutions.processLine'),
            bodyQuote: ``,
            body: ``,
            icon:"/assets/division4.png",
            bgImg:"/assets/bg_division4.png",
            bodyImg: `/assets/solutions/${i18n.resolvedLanguage}/work_flow.png`,
            bodyImgSmall: `/assets/solutions/${i18n.resolvedLanguage}/work_flow_small.png`,
            type: 'icon-4',
        },
    ]
    return(
        <Grid className="solutions-container" style={{width:'100%'}}>
            <div className="solutions-title">
                <Grid className="solutions-title-text-container">
                    <Typography  
                        variant="h3"
                        className="solutions-title-text"
                    >
                        <span className="text-1">
                            {t('solutions.title')}
                        </span>
                        <span className="text-2">
                            {t('solutions.title2')}
                        </span>
                    </Typography>
                    <Typography 
                        variant="subtitle1"
                        className="solutions-body-text"
                        style={{marginTop:15, color:'#fff', fontSize: 20}}
                    >
                        <span>
                            {t('solutions.subTitle')}
                        </span>
                    </Typography>
                </Grid>
            </div>
            <div className="solutions-division-container">
                {content.map(({title,body,icon,bgImg,type,bodyQuote,bodyImg,bodyImgSmall}, index) => {
                    return(
                        <Parallax key={title+"_"+index} bgImage={bgImg} bgImageAlt="solutions-division-bg-image" strength={400} style={{width:'100%', borderBottom: index !== content.length - 1 && '4px solid #fff'}}>
                            <div style={{position:'absolute', width:'100%', height:'100%', zIndex:10, backgroundColor:'rgb(0, 0, 0, .75)'}}></div>
                            <Grid id={"solution-section-"+(type)} className="solutions-content" style={type == 'icon-4' && {padding:'5rem 0'} || {}}>
                                <img alt="solutions-icon" className={"solutions-icon" + " " + type} src={icon} />
                                <Grid className="solutions-text-container max-width--" style={type == 'icon-4' && {width:'100%'} || {}}>
                                    <Typography
                                        variant="h4"
                                        className="solutions-section-title"
                                    >
                                        {title}
                                    </Typography>

                                    {
                                        bodyImg &&
                                        <>
                                            <img style={{maxWidth:'60rem'}} className="work-flow-chart" src={bodyImg} alt="work-flow-img" />
                                            <img style={{maxWidth:'25rem'}} className="work-flow-chart small" src={bodyImgSmall} alt="work-flow-small-img" />
                                        </>
                                    }

                                    <Typography  
                                        variant="h6"
                                        className={"solutions-section-body-quote "+(type)}
                                        style={{margin:'2rem 0', color:'#f05638', fontSize:35, textAlign:'center', letterSpacing:5}}
                                    >
                                        <span> {bodyQuote} </span>
                                    </Typography>
                                    <div style={{width:'90%', margin:'0 auto'}}>
                                        <Typography 
                                            variant="body1"
                                            className="solutions-section-body"
                                            style={{marginTop:15, color:'#fff', fontSize:32, textAlign:'center'}}
                                        >
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                                {
                                    type === 'icon-1' &&
                                    <Grid container className="solutions-analysis-stack" direction="row" justifyContent="space-between">
                                        <div>
                                            <Typography  
                                                variant="h6"
                                                style={{color:'#f05638', fontSize:28, fontWeight:700}}
                                            >
                                                {t('solutions.dataAnlysis')}
                                            </Typography>
                                            <div style={{margin:'1rem 0', width:'10%', height:2, backgroundColor:'#f05638'}} className="stack-divider"></div>
                                            <Typography  
                                                variant="h6"
                                                style={{color:'#ffbf64', fontSize:28, fontWeight:400, display:'flex', flexDirection:'row'}}
                                            >
                                                <span className="stack-analysis-text">{t('solutions.certified')} </span>
                                                <div>
                                                    <img alt="python-logo" className="solutions-analysis-logos" src="/assets/solutions/python_logo.png" />
                                                    <img alt="powerbi-logo" className="solutions-analysis-logos" style={{borderRight: '1px solid white', borderLeft: '1px solid white', padding:'0 2rem'}} src="/assets/solutions/powerbi_logo.png" />
                                                    <img alt="r-language-logo" className="solutions-analysis-logos" style={{maxWidth:'3rem'}} src="/assets/solutions/r_language_logo.png" />
                                                </div>
                                            </Typography>
                                        </div>

                                        <div className="database">
                                            <Typography  
                                                variant="h6"
                                                style={{color:'#f05638', fontSize:28, fontWeight:700, textAlign:'right'}}
                                            >
                                                {t('solutions.dataBase')} 
                                            </Typography>
                                            <div style={{display:'flex', justifyContent:'flex-end'}} className="stack-divider">
                                                <div style={{margin:'1rem 0', width:'10%', height:2, backgroundColor:'#f05638'}}></div>
                                            </div>
                                            <Typography  
                                                variant="h6"
                                                className="work-with"
                                                style={{color:'#ffbf64', fontSize:28, fontWeight:400, display:'flex', flexDirection:'row'}}
                                            >
                                                <span className="stack-analysis-text">{t('solutions.workWith')}</span> &nbsp; <span style={{color:'#fff', fontWeight:700}}>SQL Server, MySQL, PostgreSQL, Oracle</span>
                                            </Typography>
                                        </div>
                                    </Grid>
                                }

                                {
                                    type === 'icon-2' &&
                                    <div className="techs-container max-width--" style={{width:'100%', margin:'0 auto', marginTop:'4rem'}}>
                                        <Typography  
                                            variant="h6"
                                            style={{color:'#ffbf64', fontSize:28, fontWeight:700, textAlign:'center'}}
                                        >
                                            {t('solutions.techs')}
                                        </Typography>
                                        <div style={{margin:'0 auto', marginTop:'1rem', marginBottom:'2rem', width:'5%', height:2, backgroundColor:'#ffbf64'}} className="stack-divider"></div>
                                        <div className="tech-logos-container" style={{textAlign:'center'}}>
                                            <img alt="django-logo" className="solutions-analysis-logos" style={{maxWidth:'8.5rem', margin:'2rem 1rem'}} src="/assets/solutions/tech_django.png" />
                                            <img alt="react-logo" className="solutions-analysis-logos" style={{maxWidth:'3.5rem', margin:'2rem 1rem'}} src="/assets/solutions/tech_react.png" />
                                            <img alt="node-logo" className="solutions-analysis-logos" style={{maxWidth:'6rem', margin:'2rem 1rem'}}  src="/assets/solutions/tech_node.png" />
                                            <img alt="mui-logo" className="solutions-analysis-logos" style={{maxWidth:'3.5rem', margin:'2rem 1rem'}} src="/assets/solutions/tech_materialui.png" />
                                            <img alt="strapi-logo" className="solutions-analysis-logos" style={{maxWidth:'9.5rem', margin:'2rem 1rem'}}  src="/assets/solutions/tech_strapi.png" />
                                        </div>
                                    </div>
                                }
                            </Grid>
                        </Parallax>
                    )
                })}
            </div>
        </Grid>
    );
}

export async function getStaticProps({locale}) {
	return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}

export default Solutions;