import React, { useState, useEffect, useRef } from 'react';
import {Typography, Grid} from '@material-ui/core';
import Link from 'next/link';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { langs } from '../utils/index';
import { tempNavTranslation } from '../functions/generalMethods';

function DropdownItem(props) {
    return(
        <a
            href={props.href}
            onClick={props.onClick} 
        >
            <Grid className="dropdown-content" container alignItems="center">
                {
                    props.imgSrc ?
                    <img alt="solutions-icon" style={{maxWidth:'3rem', marginRight:'1rem'}} src={props.imgSrc} />
                    : null
                }
                <Grid container item direction={props.icon ? "row" : "column"} justifyContent='flex-start' alignItems={props.icon ? "center" : "flex-start"} xs={10}>
                    <Typography
                        variant="subtitle1"
                        style={{color:'#606060', fontWeight:600}}
                    >
                        {props.title}
                    </Typography>
                    {
                        props.body ?
                        <Typography 
                            variant="body2" 
                            style={{marginTop:15, color:'#606060', fontWeight:300}}
                        >
                            {props.body}
                        </Typography>
                        : null
                    }
                    {
                        !props.imgSrc && !props.active && props.icon
                    }
                </Grid>
            </Grid>
        </a>
    )
}

function LangSelector(props) {
    let langRef = useRef(null);
    const [selectedLang, setSelectedLang] = useState({});
    
    const handleOpenLang = (event) => {
        event.stopPropagation();
        const lang = langRef.current;
        lang.classList.toggle("open");
    }

    const handleChangeLang = (lang) => {
        const { pathname, asPath, query } = props.route
        props.route.push({ pathname, query }, asPath, { locale: lang })
    }

    useEffect(() => {
        const data = langs.find(item => item.value === props.route.locale);
        setSelectedLang({...data});
        window.addEventListener("click", e => {
            if(langRef.current?.classList.contains("open") && !e.target?.classList.contains("lang-selector")) {
                langRef.current.classList.remove("open");
            }
        });
    }, []);
    return(
        <div 
            onClick={handleOpenLang} 
            ref={langRef} 
            className='lang-selector menu--item-btn dropdown'
            style={{
                ...props.containerStyle,
                cursor:'pointer', alignItems:'center',
            }}
        >
            <Icon style={{color: props.color || '#383838', fontSize:props.size || 'auto'}} icon={faGlobe}  />
            <Typography style={{marginLeft:8, color:props.color || '#383838', fontSize:props.size || 'auto'}} variant="subtitle1"> {`${selectedLang.label}` } </Typography>
            <div className="dropdown-container">
                <div className="dropdown-content-wrap">
                    {
                        langs.filter(item => selectedLang.value !== item.value).map(({value, label}, index) => (
                            <React.Fragment key={`${value}-${index}`}>
                                <DropdownItem 
                                    title={label}
                                    onClick={() => handleChangeLang(value, label)}
                                    active={props.i18n?.resolvedLanguage !== value}
                                />
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}

function Navbar(props) {
    // const { t, i18n } = useTranslation();
    const { i18n } = useTranslation();
    const route = useRouter();
    let navBtn = null;
    let navRef = null;
    const [openNavButton, setOpenNavButton] = useState(false);

    const handleSideNavbar = () => {
        if(!openNavButton && !navBtn.classList.contains('show')) {
            navBtn.classList.add('show');

        }else{
            navBtn.classList.remove('show');
        }
        setOpenNavButton(!openNavButton);
    }
    const handleScroll = (e) => {
        if(e.currentTarget.pageYOffset > 0 && (navRef && !navRef.classList.contains("shadow")) ) {
            navRef.classList.add("shadow");
        }else if(e.currentTarget.pageYOffset === 0 && (navRef && navRef.classList.contains("shadow")) ){
            navRef.classList.remove("shadow");
        }
    }
    const handleResize = (e) => {
        if(e.currentTarget.innerWidth >= 1000 && openNavButton && navBtn) {
            navBtn.classList.remove('show');
            setOpenNavButton(false);
        }
    }

    const handleActiveLink = (el) => {
        const name = el.getAttribute("name");
        if(name === route.pathname) {
            el.classList.add("active");
        }else {
            el.classList.remove("active");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
    });


    useEffect(() => {
        const body = document.querySelector('body');
        if(openNavButton) {
            body.style.overflow = "hidden";
        }else {
            body.style.overflow = "auto";
        }
    }, [openNavButton]);

    useEffect(() => {
        const els = document.querySelectorAll('.navbar-content .menu .menu--item');
        const elsSideMenu = document.querySelectorAll('.side-menu-container .side-menu .menu--item');
        els.forEach(item => {
            handleActiveLink(item);
        })
        elsSideMenu.forEach(item => {
            handleActiveLink(item);
        })
    }, [route]);

    return(
        <>
        {
            openNavButton && 
            <div className='side-menu-overlay' style={{zIndex:999, width:'100%', height:'100%', position:'absolute', backgroundColor:'rgba(0, 0, 0, 0.8)'}} />
        }
        <Grid ref={ref => navRef = ref} container className="navbar-wrap scrolled" style={{top:0, position: 'sticky', zIndex: 1000, backgroundColor: '#fff'}}>
            <div className="navbar-content max-width--">
                <a href="/">
                    <img className="container--logo" src="/assets/logo.png" />
                </a>
                <ul className="menu">
                    {/* <Typography name={"/"} variant="h5" className="menu--item"><Link href="/">{t('nav.home')}</Link></Typography> */}
                    <Typography name={"/"} variant="h5" className="menu--item"><Link href="/">{tempNavTranslation(route.locale, 'home')}</Link></Typography>
                    {/* <Typography name={"/about"} variant="h5" className="menu--item"><Link href="/about">{t('nav.about')}</Link></Typography> */}
                    <Typography name={"/about"} variant="h5" className="menu--item"><Link href="/about">{tempNavTranslation(route.locale, 'about')}</Link></Typography>
                    <Typography name={"/solutions"} variant="h5" className="menu--item dropdown">
                        {/* <Link href="/solutions" className="menu--item-link dropdown-btn">{t('nav.solutions')}</Link> */}
                        <Link href="/solutions" className="menu--item-link dropdown-btn">{tempNavTranslation(route.locale, 'solutions')}</Link>
                            <div className="dropdown-container" style={{width: '30rem'}}>
                                <div className="dropdown-content-wrap">
                                    <DropdownItem 
                                        imgSrc="/assets/icon1.png"
                                        // title={t('solutions.analysis')}
                                        // body={t('nav.analysisBody')}
                                        title={tempNavTranslation(route.locale, 'analysis')}
                                        body={tempNavTranslation(route.locale, 'analysisBody')}
                                        href="/solutions/#solution-section-icon-1"
                                    />
                                    <DropdownItem
                                        imgSrc="/assets/icon2.png"
                                        // title={t('solutions.softwareDev')}
                                        // body={t('nav.softwareBody')}
                                        title={tempNavTranslation(route.locale, 'softwareDev')}
                                        body={tempNavTranslation(route.locale, 'softwareBody')}
                                        href="/solutions/#solution-section-icon-2"
                                    />
                                    {/* <DropdownItem 
                                        imgSrc="/assets/icon1.png"
                                        title="SISTEMAS DE FACTURACIÓN E INVENTARIO"
                                        body={t('solutions.analysis')}
                                            sed diam nonummy nibh euismod tincidunt."
                                    /> */}
                                    <DropdownItem
                                        imgSrc="/assets/icon3.png"
                                        // title={t('solutions.processLine')}
                                        // body={t('nav.processBody')}
                                        title={tempNavTranslation(route.locale, 'processLine')}
                                        body={tempNavTranslation(route.locale, 'processBody')}
                                        href="/solutions/#solution-section-icon-4"
                                    />
                                </div>
                            </div>
                    </Typography>
                    {/* <Typography variant="h5"x className="menu--item"><Link href="/statistics">{t('nav.statistics')}</Link></Typography> */}
                    <Typography name={"/posts"} variant="h5" className="menu--item dropdown">
                        {/* <Link href="/posts"  className="menu--item-link dropdown-btn">{t('nav.posts')}</Link> */}
                        <Link href="/posts"  className="menu--item-link dropdown-btn">{tempNavTranslation(route.locale, 'posts')}</Link>
                    </Typography>
                    {/* <Typography variant="h5" className="menu--item"><Link href="/projects">Proyectos</Link></Typography> */}
                    {/* <Typography variant="h5" className="menu--item"><Link href="#">Proyectos</Link></Typography> */}
                    {/* <Typography name={"/contact"} variant="h5" className="menu--item"><Link href="/contact">{t('nav.contact')}</Link></Typography> */}
                    <Typography name={"/contact"} variant="h5" className="menu--item"><Link href="/contact">{tempNavTranslation(route.locale, 'contact')}</Link></Typography>
                    <LangSelector
                        i18n={i18n}
                        route={route}
                        containerStyle={{display:'inherit', fontSize:21}}
                    />
                </ul>

                <div className="side-menu-button" style={{zIndex:(999999+1)}} onClick={handleSideNavbar}>
                    {
                        openNavButton ? <Icon style={{color:'#fff'}} icon={faTimes}/> : <Icon icon={faBars}/>
                    }
                </div>
                <div className="side-menu-container" ref={btn=>{navBtn = btn}}>
                    <ul className="side-menu">
                        <Typography name={"/"} onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">
                            <Link href="/">
                                {/* {t('nav.home')} */}
                                {tempNavTranslation(route.locale, 'home')}
                            </Link>
                        </Typography>
                        <Typography name={"/about"} onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">
                            <Link href="/about">
                                {/* {t('nav.about')} */}
                                {tempNavTranslation(route.locale, 'about')}
                            </Link>
                        </Typography>
                        <Typography name={"/solutions"} onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">
                            <Link href="/solutions">
                                {/* {t('nav.solutions')} */}
                                {tempNavTranslation(route.locale, 'solutions')}
                            </Link>
                        </Typography>
                        {/* <Link href="/statistics"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">{t('nav.statistics')}</Typography></Link> */}
                        
                        <Typography name={"/posts"} onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">
                            <Link href="/posts">
                                {/* {t('nav.posts')} */}
                                {tempNavTranslation(route.locale, 'posts')}
                            </Link>
                        </Typography>
                        <Typography  name={"/contact"} onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">
                            <Link href="/contact">
                                {/* {t('nav.contact')} */}
                                {tempNavTranslation(route.locale, 'contact')}
                            </Link>
                        </Typography>
                        <LangSelector
                            i18n={i18n}
                            route={route}
                            color='#fff'
                            size="1.5rem"
                            containerStyle={{margin:'5rem 0 0 1rem', display:'flex'}}
                        />
                    </ul>
                </div>
            </div>
        </Grid>
        </>
    );
}

export default Navbar;