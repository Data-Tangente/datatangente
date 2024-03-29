import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import Glide from "@glidejs/glide";
import { BackIcon, NextIcon, NavCircleIcon } from "./SvgIcons";
import lottie from "lottie-web";
import { useTranslation, Trans } from "react-i18next";

function Slideshow(props) {
  const { i18n } = useTranslation();
  // const [glide, setGlide] = useState(null);
  const glide = useRef();

  let slideRef = [];
  let slideNavRef = [];
  let animations = {};
  let onceFirstSlideLoad = 0;

  const source = [
    `/assets/animations/${i18n.resolvedLanguage}/json/banner_1/banner.json`,
    `/assets/animations/${i18n.resolvedLanguage}/json/banner_2/banner.json`,
    `/assets/animations/${i18n.resolvedLanguage}/json/banner_3/banner.json`,
    `/assets/animations/${i18n.resolvedLanguage}/json/banner_4/banner.json`,
  ];

  const loadAnimations = () => {
    source.forEach((item, index) => {
      animations["animation-" + index] = lottie.loadAnimation({
        container: slideRef.length > 0 && slideRef[index],
        name: "animation-" + index,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: item,
      });
    });
  };

  const handleGlide = () => {
    if (glide.current) {
      glide.current.destroy();
      glide.current = null;
      const elToRemove = document.querySelectorAll(
        ".glide .glide__track .glide__slides .glide__slide > svg"
      );
      elToRemove.forEach((el) => {
        el.remove();
      });
    }
    glide.current = new Glide(".glide", {
      type: "slider",
      autoplay: 8000,
      rewind: true,
      rewindDuration: 0,
      hoverpause: false,
    });
    loadAnimations();
    glide.current.on(["mount.after", "run"], () => {
      const currentIndex = glide.current.index;
      if (slideRef[currentIndex]) {
        if (!onceFirstSlideLoad) {
          onceFirstSlideLoad = 1;
          animations["animation-" + currentIndex].play();
        } else {
          animations["animation-" + currentIndex].goToAndStop(0);
          animations["animation-" + currentIndex].play();
        }
        slideNavRef.forEach((item) =>
          item.getElementsByTagName("svg")[0].classList.remove("active")
        );
        slideNavRef[currentIndex]
          .getElementsByTagName("svg")[0]
          .classList.add("active");
      }
    });
    glide.current.mount();
  };

  // dynamic slide language change
  useEffect(() => {
    handleGlide();
  }, [i18n.resolvedLanguage]);

  // useEffect(() => {
  //     handleGlide();
  // }, []);

  return (
    // <Grid container style={{display:'inline-block', maxWidth:'100%', margin: '0 auto', padding: '0 10%'}}>
    <Grid container className="section banner-slideshow-container max-width--">
      <div className="glide" style={{ width: "100%", position: "relative" }}>
        <div data-glide-el="track" className="glide__track">
          <ul className="glide__slides">
            {source.map((item, index) => {
              return (
                <li
                  key={"control-arrow" + index}
                  className="glide__slide"
                  ref={(slide) => {
                    slideRef[index] = slide;
                  }}
                />
              );
            })}
          </ul>
        </div>
        <div
          className="glide__arrows slide-banner-btn-container"
          data-glide-el="controls">
          <span
            className="glide__arrow glide__arrow--left banner-slideshow-control-arrow"
            data-glide-dir="<">
            {" "}
            <BackIcon />{" "}
          </span>
          <span
            className="glide__arrow glide__arrow--right banner-slideshow-control-arrow"
            data-glide-dir=">">
            {" "}
            <NextIcon />{" "}
          </span>
        </div>
        <div
          data-glide-el="controls[nav]"
          className="banner-slide-nav-container">
          {source.map((item, index) => {
            return (
              <span
                key={"control-nav" + index}
                ref={(nav) => {
                  slideNavRef[index] = nav;
                }}
                data-glide-dir={"=" + index}>
                <NavCircleIcon />
              </span>
            );
          })}
        </div>
      </div>
    </Grid>
  );
}

export default Slideshow;
