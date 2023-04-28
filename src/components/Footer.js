import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Link from "next/link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
// import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";
import { tempNavTranslation } from "../functions/generalMethods";
import ContactFormFooter from "./ContactFormFooter";

function Footer(props) {
  // const { t } = useTranslation();
  const route = useRouter();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="footer-container-wrapper">
      {/* <div className="max-width--">
        
            </div> */}
      <Grid item container className="section footer-container max-width--">
        <div className="contact-footer left-container">
          <Typography variant="h6" className="contact-footer-title">
            {tempNavTranslation(route.locale, "contactInfo")}
          </Typography>
          <div className="footer-number">
            <span className="phone-icon-container">
              <Icon icon={faPhoneAlt} />
            </span>
            <Typography variant="subtitle1" style={{ color: "#fff" }}>
              {"829-891-1171"}
            </Typography>
          </div>

          <div className="footer-mail">
            <span className="email-icon-container">
              <Icon icon={faEnvelope} />
            </span>
            <Typography variant="subtitle1" style={{ color: "#fff" }}>
              {"info@datatangente.com"}
            </Typography>
          </div>

          <div className="footer-address">
            <span className="address-icon-container">
              <Icon icon={faMapMarkerAlt} />
            </span>
            <Typography
              variant="subtitle1"
              style={{ color: "#fff", width: "14rem" }}>
              <span>
                {/* {t('footer.address')} */}
                {tempNavTranslation(route.locale, "address")}
              </span>
            </Typography>
          </div>

          <div className="social-icon-wrap" style={{ width: "12rem" }}>
            <span className="social-icon-container">
              <a href="https://www.instagram.com/datatangente/" target="_blank">
                <Icon icon={faInstagram} />
              </a>
            </span>
            <span className="social-icon-container">
              <a
                href="https://www.linkedin.com/company/data-tangente"
                target="_blank">
                <Icon icon={faLinkedin} />
              </a>
            </span>
            <span className="social-icon-container">
              <a
                href="https://www.facebook.com/people/Data-Tangente/100090143590484/?mibextid=LQQJ4d"
                target="_blank">
                <Icon icon={faFacebook} />
              </a>
            </span>
            <span className="social-icon-container">
              <a
                href="https://api.whatsapp.com/send/?phone=8298911171&text&type=phone_number&app_absent=0"
                target="_blank">
                <Icon icon={faWhatsapp} />
              </a>
            </span>
          </div>
        </div>
        <div className="menu-footer">
          <ul>
            <div className="about container-menu-footer">
              <Typography variant="h6" className="about--">
                {tempNavTranslation(route.locale, "about")}
              </Typography>
              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/about/#about-us">
                  {/* {t('footer.aboutUs')} */}
                  {tempNavTranslation(route.locale, "aboutUs")}
                </Link>
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/about/#mission">
                  {tempNavTranslation(route.locale, "mission")}
                </Link>
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/about/#vission">
                  {tempNavTranslation(route.locale, "vision")}
                </Link>
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/about/#values">
                  {tempNavTranslation(route.locale, "values")}
                </Link>
              </Typography>
            </div>

            <div className="home container-menu-footer">
              <Typography variant="h6" className="home--">
                {tempNavTranslation(route.locale, "home")}
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/#subscribe-division">
                  {tempNavTranslation(route.locale, "suscribe")}
                </Link>
              </Typography>
            </div>

            <div className="solutions container-menu-footer">
              <Typography variant="h6" className="solutions--">
                {tempNavTranslation(route.locale, "solutions")}
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/solutions/#solution-section-icon-1">
                  {tempNavTranslation(route.locale, "analysis")}
                </Link>
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/solutions/#solution-section-icon-2">
                  {tempNavTranslation(route.locale, "softwareDev1")}
                </Link>
              </Typography>

              <Typography variant="subtitle1" className="menu--item footer">
                <Link href="/solutions/#solution-section-icon-4">
                  {tempNavTranslation(route.locale, "processLine1")}
                </Link>
              </Typography>
            </div>

            <div className="posts container-menu-footer">
              <Typography variant="h6" className="posts--">
                <Link href="/posts/">
                  {tempNavTranslation(route.locale, "posts")}
                </Link>
              </Typography>
            </div>
          </ul>
        </div>
        {/* <div className="footer-subscribe">
                    <Typography variant="h6" style={{letterSpacing:5, display:'inline-block', paddingRight:'1.5rem', color:'#fff'}}><Link href="/">BOLETÍN</Link></Typography>
                    <div className="button-subscribe footer" style={{display:'inline-block'}}>
                        <span>Suscribirme</span>
                    </div>
                </div> */}
        <div className="contact">
          <Typography variant="h6" className="contact--">
            {tempNavTranslation(route.locale, "contact")}
          </Typography>
          <ContactFormFooter />
        </div>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        className="conditions-container max-width--">
        <Typography variant="overline" style={{ color: "#fff" }}>
          © COPYRIGHT 2021-2022 DATATANGENTE
        </Typography>
        <div>
          <Typography
            variant="body2"
            className="menu--item footer"
            style={{ marginRight: "1rem", display: "inline-block" }}>
            <Link href="#">
              {/* {t('footer.terms')} */}
              {tempNavTranslation(route.locale, "terms")}
            </Link>
          </Typography>
          <Typography
            variant="body2"
            className="menu--item footer"
            style={{ display: "inline-block" }}>
            <Link href="#">
              {/* {t('footer.privacy')} */}
              {tempNavTranslation(route.locale, "privacy")}
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default Footer;
