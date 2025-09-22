import { memo, Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import img2 from "/assets/images/Susila.png";

import apple from "/assets/images/footer/appstore.png";
import playstore from "/assets/images/footer/google.webp";

// the hook
import { useTranslation } from "react-i18next";

const FooterMega = memo(() => {
  const { t } = useTranslation();
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 250) {
      setAnimationClass("animate__fadeIn");
    } else {
      setAnimationClass("animate__fadeOut");
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  const handleAppStoreRedirect = (platform) => {
    const link = platform === 'ios' ? "https://apps.apple.com" : "https://play.google.com/store/games?hl=en";
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Fragment>
      <footer className="footer footer-default">
        <Container fluid>
          <div className="footer-top">
            <Row>
              {/* Footer Logo and Contact Info */}
              <Col xl={3} lg={6} className="mb-5 mb-lg-0 text-center text-lg-start d-flex flex-row flex-lg-column justify-content-between justify-content-lg-center">
                <div className="footer-logo align-content-center">
                  <Link className="navbar-brand text-primary" to="/home">
                    <img
                      className="img-fluid logo logo-lg mt-5 mt-lg-0 mr-lg-10"
                      src={img2}
                      loading="lazy"
                      alt="streamit"
                      style={{ width: "100px", height: "auto", maxHeight: "none" }}
                    />
                  </Link>
                </div>
                <div className="footer-content">
                  <p className="mb-4 font-size-16">
                    {t("footer.email_us")}:{" "}
                    <a href={`mailto:${t("footer.info@slflicks")}`} className="text-white">
                      {t("footer.info@slflicks")}
                    </a>
                  </p>
                  <div className="contact-info text-white mb-0">
                    <p className="mb-2">
                      <a href="tel:+971506854568" className="text-white">Dubai:  +971 50 685 4568</a>
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <div>
                        <p className="mb-0">
                          Sri Lanka:
                        </p>
                      </div>
                      <div className="">
                        <div className="mb-0">
                          <a href="tel:+94716555588" className="text-white">+94 716 555 588</a>
                        </div>
                        <div className="mb-0">
                          <a href="tel:+94717555588" className="text-white">+94 717 555 588</a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Col>
              <Col className="ms-lg-5 ">
                <Row className="justify-content-between">
                  {/* Quick Links */}
                  <Col className="d-flex justify-content-between">
                    <Col xl={2} lg={6} className="mb-5 mb-lg-0  text-lg-start">
                      <h4 className="footer-link-title">{t("footer.quick_links")}</h4>
                      <ul className="list-unstyled footer-menu">
                        <li className="mb-3">
                          <Link to="./pricing" className="ms-2">{t("header.pricing_plan")}</Link>
                        </li>
                        <li className="mb-3">
                          <Link to="./faq" className="ms-2">{t("header.faq")}</Link>
                        </li>
                      </ul>
                    </Col>

                    {/* About Company */}
                    <Col xl={2} lg={6} className="mb-5 mb-lg-0  text-lg-start">
                      <h4 className="footer-link-title">{t("footer.about_company")}</h4>
                      <ul className="list-unstyled footer-menu">
                        <li className="mb-3">
                          <Link to="./about-us" className="ms-2">{t("header.about_us")}</Link>
                        </li>
                        <li className="mb-3">
                          <Link to="/contact-us" className="ms-2">{t("header.contact_us")}</Link>
                        </li>
                      </ul>
                    </Col>

                    {/* Legal and Terms */}
                    <Col xl={2} lg={6} className="mb-5 mb-lg-0  text-lg-start">
                      <h4 className="footer-link-title ">{t("footer.legal_company")}</h4>
                      <ul className="list-unstyled footer-menu">
                        <li className="mb-3">
                          <Link to="/privacy-policy" className="ms-2">{t("header.privacy_policy")}</Link>
                        </li>
                        <li>
                          <Link to="/terms-of-use" className="ms-2">{t("footer.terms_of_use")}</Link>
                        </li>
                      </ul>
                    </Col>
                  </Col>

                </Row>
                <Row>
                  {/* Social Media */}
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-lg-5 mt-0">
                    <span className="font-size-14">{t("footer.follow_us")}</span>
                    <ul className="p-0 m-0 list-unstyled widget_social_media d-flex gap-3">
                      <li>
                        <Link
                          to="https://www.facebook.com/susilalife?mibextid=ZbWKwL/"
                          className="position-relative"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.youtube.com/channel/UCPanPZ7x8Gyczus5A1kQCww"
                          className="position-relative"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.instagram.com/susila_life/?igshid=MzRlODBiNWFlZA%3D%3D"
                          className="position-relative"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Col>

            </Row>

          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom border-top">
            <Row className="align-items-center justify-content-center">
              <Col className="text-center">
                <p className="font-size-17">
                  © <span className="currentYear">2024</span>{" "}
                  <span className="text-primary">Sl Flicks</span>.{" "}
                  All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Susila Life. Duplication and copy of this is strictly prohibited. All rights reserved.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </footer>

      {/* Back to Top Button */}
      <div
        id="back-to-top"
        style={{ display: "none" }}
        className={`animate__animated ${animationClass}`}
        onClick={scrollToTop}
      >
        <Button
          variant="primary"
          className="p-0 btn-sm position-fixed top-0 end-0 border-0 rounded-circle"
          id="top"
        >
          <i className="fa-solid fa-chevron-up"></i>
        </Button>
      </div>
    </Fragment>
  );
});

FooterMega.displayName = "FooterMega";
export default FooterMega;

