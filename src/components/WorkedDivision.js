import React, { useState, useEffect, useRef } from 'react';
import {Grid, } from '@material-ui/core';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import Glide from '@glidejs/glide';

function WorkedDivision(props) {

    const workLogos = [
        {src: "/assets/work_with/logos/1.png", size: "20rem"},
        {src: "/assets/work_with/logos/2.png", size: "20rem"},
        {src: "/assets/work_with/logos/3.png", size: "20rem"},
        {src: "/assets/work_with/logos/4.png", size: "20rem"},
        {src: "/assets/work_with/logos/5.png", size: "20rem"},
        {src: "/assets/work_with/logos/6.png", size: "20rem"},
    ]

    const [sizeChange, setChangeSize] = useState("large");
    const institutionRef = useRef({size:"large", perView:5});
    let slideRef = [];

    const glide = useRef();

    const handleAssetsChange = (e) => {
            if(e.innerWidth > 1600 && institutionRef.current?.size !== "large") {
                institutionRef.current = {size: "large", perView: 5};
                setChangeSize("large");
            }else if(e.innerWidth <= 1600 && e.innerWidth > 900 && institutionRef.current?.size !== "medium") {
                institutionRef.current = {size: "medium", perView: 3};
                setChangeSize("medium");
            }else if(e.innerWidth <= 900 && institutionRef.current?.size !== "small") {
                institutionRef.current = {size: "small", perView: 1};
                setChangeSize("small");
            }
    }

    const handleGlide = () => {
        if(glide.current) {
            glide.current.destroy();
            glide.current = null;
        }
        glide.current = new Glide('.works-slideshow', {
            type:'carousel',
            focusAt: 'center',
            peek: {
                before: "0",
                after: "0"
            },
            perView: institutionRef.current.perView,
        });
        glide.current.on(['mount.after', 'run'], () => {
            //
        })
        glide.current.mount();
    }
    useEffect(() => {
        handleGlide();
    }, [sizeChange]);

    useEffect(() => {
        window.addEventListener('resize', e => handleAssetsChange(e.currentTarget));
    });
    useEffect(() => {
        handleAssetsChange(window);
    }, []);

    return(

        <Grid container alignItems="center" justifyContent="center" style={{position:'relative',width:'100%', padding:'50px 0', backgroundColor:props.bgColor}}>
            <div className="works-slideshow" style={{width:'100%', textAlign:'center'}}>
                <div data-glide-el="track" className="glide__track">
                    <ul className="glide__slides">
                        {
                            workLogos.map((item, index) => {
                                return(
                                    <li key={"control-arrow"+index} className="glide__slide" ref={slide=>{slideRef[index] = slide}} style={{height:'8rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <img alt="worked-with-icon" style={{maxWidth:item.size, }} className="work-brands-img" src={item.src} />
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