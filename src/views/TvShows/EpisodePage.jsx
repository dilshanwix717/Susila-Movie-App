import React, { Fragment, memo, useRef } from "react";
import { Row, Col, Container, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import HLsPlayer from "../../components/plugins/HLsPlayer.jsx";
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
                    {selectedVideoData.title} |&nbsp;
                  </h2>
                  <h3 className="trending-text fw-bold texture-text text-uppercase my-0 fadeInLeft animated d-inline-block">
                    Episode {selectedVideoData.episode}
                  </h3>
                </div>
                <ul className="p-0 mt-2 list-inline d-flex flex-wrap movie-tag">
                  <li className="font-size-18">
                    {selectedVideoData.season ? `S${selectedVideoData.season}-` : ""}E{selectedVideoData.episode}
                  </li>
                  <li className="font-size-18">{selectedVideoData.title}</li>
                  <li className="font-size-18">{selectedVideoData.subcategory}</li>
                </ul>
                {/* <ul className="list-inline p-0 share-icons music-play-lists mb-n2 mx-n2">
                  <li><span><i className="fa-solid fa-heart"></i></span></li>
                  <li><span><i className="fa-solid fa-plus"></i></span></li>
                </ul> */}
              </Col>
            </Row>
          </div>
          <div className="content-details trending-info">
            <Tab.Container defaultActiveKey="first">
              <Nav className="iq-custom-tab tab-bg-gredient-center d-flex nav nav-pills align-items-start text-left mb-5 justify-content-left list-inline">
                <Nav.Item><Nav.Link eventKey="first" variant=" d-flex align-items-center">{t("episode_page.description")}</Nav.Link></Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <p>{selectedVideoData.description}</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Container>
      </div>
      <div className="recommended-block">
        <Container fluid>
          <div className="overflow-hidden">
            <div className="d-flex align-items-center justify-content-between px-3 pt-2 my-4">
              <h5 className="main-title text-capitalize mb-0">Episodes</h5>
            </div>
            <div className="card-style-slider">
              <Swiper key={themeSchemeDirection} dir={themeSchemeDirection} slidesPerView={4} modules={[Navigation]} loop={true} spaceBetween={5} navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }} breakpoints={{ 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 768: { slidesPerView: 2 }, 1025: { slidesPerView: 4 }, 1500: { slidesPerView: 4 } }} >
                {selectedVideoArray.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="episode-block">
                      <div className="block-image position-relative">
                        <Link to="/episodes">
                          <img src={item.thumbnail_url} alt="showImg" className="img-fluid img-zoom" loading="lazy" />
                        </Link>
                        <div className="episode-number">S{item.season}-E{item.episode}</div>
                        <div className="episode-play">
                          <Link to="/episodes" onClick={() => { setSelectedVideoArray(selectedVideoArray); setSelectedVideoData(item); window.scrollTo(0, 0); }}>
                            <i className="fa-solid fa-play"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="epi-desc p-3">
                        <Link to="/episodes" onClick={() => { setSelectedVideoArray(selectedVideoArray); setSelectedVideoData(item); }}>
                          <h5 className="epi-name text-white mb-0">{item.title} E-{item.episode}</h5>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
});

TvShowsDetail.displayName = "TvShowsDetail";
export default TvShowsDetail;