import React, { useState, useEffect } from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import Link from 'next/link';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'

function DropdownItem(props) {
    return(
        <a href={props.href}>
        <Grid className="dropdown-content" container alignItems="center">
            {
                props.iconSrc ?
                <img alt="solutions-icon" style={{maxWidth:'3rem', marginRight:'1rem'}} src={props.iconSrc} />
                : null
            }
            <Grid container item direction="column" xs={10}>
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
            </Grid>
        </Grid>
        </a>
    )
}

function Navbar(props) {
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
    const handleScroll = () => {
        if(window.pageYOffset > 0 && (navRef && !navRef.classList.contains("scrolled")) ) {
            navRef.classList.add("scrolled");
        }else if(window.pageYOffset === 0 && (navRef && navRef.classList.contains("scrolled")) ){
            navRef.classList.remove("scrolled");
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        const els = document.querySelectorAll('.menu--item > a');
        const elsSideMenu = document.querySelectorAll('.side-menu-container .side-menu > a');
        els.forEach(item => {
            if(item.getAttribute("href") === (route.pathname + '/') || item.getAttribute("href") === (route.pathname)) {
                item.classList.add("active");
            }else {
                item.classList.remove("active");
            }
        })
        elsSideMenu.forEach(item => {
            if(item.getAttribute("href") === (route.pathname + '/') || item.getAttribute("href") === (route.pathname)) {
                item.classList.add("active");
            }else {
                item.classList.remove("active");
            }
        })
    })
    return(
        <Grid ref={ref => navRef = ref} container className="navbar-container" style={{top:0, position: 'sticky', zIndex: 1000, backgroundColor: '#fff'}}>
        {/* <Grid container className="navbar-container" style={{border:'1px solid black'}}> */}
            <a href="/">
                {/* <div className="container--logo" style={{marginTop: '1rem'}}></div> */}
                <img className="container--logo" src="/assets/logo.png" />
            </a>
            <ul className="menu">
                <Typography variant="h5" className="menu--item"><Link href="/">Inicio</Link></Typography>
                <Typography variant="h5" className="menu--item"><Link href="/about">Nosotros</Link></Typography>
                <Typography variant="h5" className="menu--item dropdown">
                    <Link href="/solutions" className="menu--item-link dropdown-btn">Soluciones</Link>
                        <div className="dropdown-container" style={{width: '30rem'}}>
                            <div className="dropdown-content-wrap">
                                <DropdownItem 
                                    iconSrc="/assets/icon1.png"
                                    title="ANÁLISIS DE DATA"
                                    body="Soluciones y plataformas acorde a las necesidades de nuestros clientes."
                                    href="/solutions/#solution-section-icon-1"
                                />
                                <DropdownItem
                                    iconSrc="/assets/icon2.png"
                                    title="DESARROLLO DE SOFTWARE"
                                    body="Plataformas y programas personalizadas para nuestros clientes."
                                    href="/solutions/#solution-section-icon-2"
                                />
                                {/* <DropdownItem 
                                    iconSrc="/assets/icon1.png"
                                    title="SISTEMAS DE FACTURACIÓN E INVENTARIO"
                                    body="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
                                        sed diam nonummy nibh euismod tincidunt."
                                /> */}
                                <DropdownItem
                                    iconSrc="/assets/icon3.png"
                                    title="LÍNEA DE PROCESO"
                                    body="Visualice nuestra línea de proceso"
                                    href="/solutions/#solution-section-icon-4"
                                />
                            </div>
                        </div>
                </Typography>
                <Typography variant="h5" className="menu--item dropdown">
                    <Link href="/posts"  className="menu--item-link dropdown-btn">Publicaciones</Link>
                </Typography>
                {/* <Typography variant="h5" className="menu--item"><Link href="/projects">Proyectos</Link></Typography> */}
                {/* <Typography variant="h5" className="menu--item"><Link href="#">Proyectos</Link></Typography> */}
                <Typography variant="h5" className="menu--item"><Link href="/contact">Contactos</Link></Typography>
            </ul>

            <div className="side-menu-button" onClick={handleSideNavbar}>
                {
                    openNavButton ? <Icon icon={faTimes}/> : <Icon icon={faBars}/>
                }
            </div>
            <div className="side-menu-container" ref={btn=>{navBtn = btn}}>
                <ul className="side-menu">
                    <Link href="/"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">Inicio</Typography></Link>
                    <Link href="/about"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">Nosotros</Typography></Link>
                    <Link href="/solutions"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">Soluciones</Typography></Link>
                    <Link href="/posts"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">Publicaciones</Typography></Link>
                    {/* <Typography variant="h5" className="menu--item side-menu-list--item"><Link href="/projects">Proyectos</Link></Typography> */}
                    {/* <Link href="#"><Typography variant="h5" className="menu--item side-menu-list--item">Proyectos</Typography></Link> */}
                    <Link href="/contact"><Typography onClick={handleSideNavbar} variant="h5" className="menu--item side-menu-list--item">Contactos</Typography></Link>
                </ul>
            </div>

        </Grid>
    );
}

export default Navbar;