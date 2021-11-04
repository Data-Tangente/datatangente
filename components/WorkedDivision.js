import React, { useState, useEffect } from 'react';
import {Grid, } from '@material-ui/core';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import Glide from '@glidejs/glide';

function WorkedDivision(props) {

    const [windowSize, setWindowSize] = useState({width: undefined, height: undefined});
    const [glideState, setGlideState] = useState(false);
    let slideRef = [];
    // const institutions = [
    //     {src: "/assets/minerd.png",size:'20rem'},
    //     {src: "/assets/optica_covi.png",size:'20rem'},
    //     {src: "/assets/united.png",size:'8rem'},
    //     {src: "/assets/ant.png",size:'14rem'},
    //     {src: "/assets/minerd.png",size:'20rem'},
    //     {src: "/assets/optica_covi.png",size:'20rem'},
    // ];
    const institutions = [
        {src: "/assets/worked_with_1.png",size:'20rem'},
        {src: "/assets/worked_with_2.png",size:'20rem'},
    ];
    let glide = new Glide('.works-slideshow', {
        type:'carousel',
        focusAt: 'center',
        perView: 1,
    });

    const handleWindowResize = () => {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        glide.on(['mount.after', 'run'], () => {
            const currentIndex = glide.index;
        })
        glide.mount();
    }, [])
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowResize);
    //     handleWindowResize();
    //     return () => window.removeEventListener('resize', handleWindowResize);
    // }, []);

    // useEffect(() => {
    //     if(windowSize.width <= 1000 && !glideState) {
    //         setGlideState(true);
    //         glide.destroy();
    //         glide = new Glide('.works-slideshow', {
    //             type:'carousel',
    //             focusAt: 'center',
    //             perView: 1,
    //         });
    //         glide.mount();
    //     }else if(windowSize.width > 1000 && glideState){
    //         setGlideState(false);
    //         glide.destroy();
    //         glide = new Glide('.works-slideshow', {
    //             type:'carousel',
    //             focusAt: 'center',
    //             perView: 2,
    //         });
    //         glide.mount();
    //     }
        
    // }, [windowSize.width])

    return(

        <Grid container alignItems="center" justify="center" style={{position:'relative',width:'100%', padding:'50px 0', backgroundColor:props.bgColor}}>
            <div className="works-slideshow" style={{width:'100%', textAlign:'center'}}>
                <div data-glide-el="track" className="glide__track">
                    <ul className="glide__slides">
                        {
                            institutions.map((item, index) => {
                                return(
                                    <li key={"control-arrow"+index} className="glide__slide" ref={slide=>{slideRef[index] = slide}}>
                                        <img alt="worked-with-icon" className="work-brands-img" src={item.src} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="glide__arrows slide-works-arrow-container" data-glide-el="controls">
                    <span className="works-slideshow-control-arrow" data-glide-dir="<"> <Icon icon={faChevronLeft} /> </span>
                    <span className="works-arrow-circle" data-glide-dir="=0"><Icon icon={faCircle} /></span>
                    <span className="works-slideshow-control-arrow" data-glide-dir=">"> <Icon icon={faChevronRight} /> </span>
                </div>
            </div>
        </Grid>
    )
}

export default WorkedDivision;