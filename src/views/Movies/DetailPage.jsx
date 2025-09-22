import React, { Fragment, memo, useRef } from "react";
import { Row, Col, Container, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
//import HLsPlayer from "../../components/plugins/HLsPlayer.jsx";
import { useEnterExit } from "../../utilities/usePage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../store/setting/selectors";
import { useTranslation } from "react-i18next";
import { useViewData } from "../../ViewDataContext.jsx";
import 'plyr/dist/plyr.css';
import './EpisodePage.css'
import HLS from '../../components/plugins/HLS.jsx'
import MoviesRecommendedForYou from "../../components/sections/MoviesRecommendedForYou";

const TvShowsDetail = memo(() => {
  const { t } = useTranslation(), playerRef = useRef(null);
  useEnterExit();
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const { selectedVideoData, selectedVideoArray, setSelectedVideoData, setSelectedVideoArray } = useViewData();

  return (
    <Fragment>
      <div className="iq-main-slider site-video mb-5 mb-md-0">
        {selectedVideoData && typeof selectedVideoData.video_url === "string" && selectedVideoData.video_url.trim() ? (
          <HLS videoSource={selectedVideoData.video_url} />
        ) : (
          <div className="error-message mt-5 text-center ">
            <h4 className="mt-5">{t("This Video is not available right now")}</h4>
            <p>{t("Please try a another one ")}</p>
          </div>
        )}
      </div>
      <div className="details-part">
        <Container fluid>
          <div className="trending-info mt-4 pt-0 pb-4">
            <Row>
              <Col md={9} className="col-12 mb-auto">
                <div className="d-md-flex">
                  <h2 className="trending-text fw-bold texture-text text-uppercase mt-0 fadeInLeft animated">
                    {selectedVideoData.title}
                  </h2>
                </div>
                <ul className="p-0 mt-2 list-inline d-flex flex-wrap movie-tag">
                  <li className="font-size-18">{selectedVideoData.title}</li>
                  <li className="font-size-18">{selectedVideoData.subcategory}</li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="content-details trending-info">
            <Tab.Container defaultActiveKey="first">
              <Nav className="iq-custom-tab tab-bg-gredient-center d-flex nav nav-pills align-items-start text-left mb-5 justify-content-left list-inline">
                <Nav.Item>
                  <Nav.Link eventKey="first" variant="d-flex align-items-left text-left">
                    {t("episode_page.description")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {selectedVideoData.description}
                  </pre>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Container>
      </div>
      <div className="recommended-block">
        <MoviesRecommendedForYou slides="6" paddingY="my-4" />
      </div>
    </Fragment>
  );
});

TvShowsDetail.displayName = "TvShowsDetail";
export default TvShowsDetail;
