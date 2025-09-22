import React, { Fragment, memo, useEffect, useState } from "react";
import { Row, Col, Container, Nav, Tab } from "react-bootstrap"; // Simplified imports
import { Link } from "react-router-dom";
import { useViewData } from "../../ViewDataContext.jsx";
import { executeGetContentBySeries } from "../../api/endPoints.jsx";
import { useTranslation } from "react-i18next";
import ChoicesJs from "../../components/choice";
import { useEnterExit } from "../../utilities/usePage";

const options = [{ value: "Season 1", label: "Season 1" }, { value: "Season 2", label: "Season 2" }]; // Options for select

const TvShowsDetail = memo(() => {
  const { selectedTVSeriesContents, selectedTVSeries, setVideoUrls, setSelectedVideoData, setSelectedVideoArray } = useViewData();
  const { t } = useTranslation();
  const [contentDataBySeries, setContentDataBySeries] = useState([]);
  const options1 = [{ value: t('header.playlist'), label: t('header.playlist') }, { value: selectedTVSeries, label: selectedTVSeries }, { value: t('detail_page.sand_dust'), label: t('detail_page.sand_dust') }, { value: t('detail_page.jumbo_queen'), label: t('detail_page.jumbo_queen') }];
  useEnterExit();



  const getContentsBySeries = async () => { // Get content by series
    try {
      const response = await executeGetContentBySeries(selectedTVSeriesContents['category'] || 'Teledrama', selectedTVSeries);
      setContentDataBySeries(response.data['data']);
    } catch (error) { console.error('Error:', error); }
  }

  useEffect(() => { getContentsBySeries(); }, []); // Initial data load

  return (
    <Fragment>
      <div className="tv-show-detail">
        <Container fluid>
          <div className="overlay-wrapper iq-main-slider" style={{ backgroundRepeat: "no-repeat" }}>
            <div className="banner-caption">
              <div className="trending-info p-0">
                <h1 className="texture-text big-font text-uppercase mt-2">{selectedTVSeries}</h1>
                <div className="ratting-start p-0 m-0 list-inline text-warning d-flex align-items-center justify-content-left">
                  <img src={selectedTVSeriesContents['thumbnail_url'] || selectedTVSeriesContents['banner_url']} alt="imdb-logo" className="img-fluid ms-2" />
                </div>
                <p className="line-count-2 my-4">{selectedTVSeriesContents['description']}</p>
              </div>
              <div className="position-relative my-4">
                <Link to="/episodes" className="d-flex align-items-center gap-3" onClick={() => {
                  setVideoUrls(contentDataBySeries[contentDataBySeries.length - 1].video_url);
                  setSelectedVideoArray(contentDataBySeries);
                  setSelectedVideoData(contentDataBySeries[contentDataBySeries.length - 1]);
                }}>
                  <div className="play-button"><i className="fa-solid fa-play"></i></div>
                  <h4 className="text-white fw-bold m-0">{t("episode_page.latest_episode")}</h4>
                </Link>
              </div>
              {/* <div className="d-flex align-items-center flex-wrap gap-4 mb-4">
                <ul className="list-inline p-0 m-0 share-icons music-play-lists mb-n2 mx-n2">
                  <li><span><i className="fa-solid fa-heart"></i></span></li>
                  <li><span><i className="fa-solid fa-plus"></i></span></li>
                </ul>
                <ChoicesJs options={options1} className="js-choice" select="one" />
              </div> */}
            </div>
          </div>
        </Container>
      </div>
      <div className="show-detail section-padding">
        <Container fluid>
          <div className="show-custom-tab">
            <Tab.Container defaultActiveKey="first">
              <Nav className="iq-custom-tab tab-bg-fill nav nav-pills text-center list-inline my-4">
                <Nav.Item><Nav.Link eventKey="first">{t("detail_page.episode")}</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="second">{t("detail_page.description")}</Nav.Link></Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row className="list-inline p-0 mb-0">
                    {contentDataBySeries.map((item, index) => (
                      <Col lg={3} sm={12} md={6} key={index}>
                        <div className="episode-block">
                          <div className="block-image position-relative">
                            <Link to="/episodes">
                              <img src={item.thumbnail_url} alt="showImg" className="img-fluid img-zoom" loading="lazy" />
                            </Link>
                            <div className="episode-number">S{item.season}-E{item.episode}</div>
                            <div className="episode-play">
                              <Link to="/episodes" onClick={() => {
                                setVideoUrls(item.video_url);
                                setSelectedVideoArray(contentDataBySeries);
                                setSelectedVideoData(item);
                              }}>
                                <i className="fa-solid fa-play"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="epi-desc p-3">
                            <Link to="/episodes" onClick={() => {
                              if (item.video_url) {
                                setVideoUrls(item.video_url); // Ensure video_url exists
                                setSelectedVideoArray(contentDataBySeries); // Update video array
                                setSelectedVideoData(item); // Update current video
                              } else {
                                console.error("Invalid video URL");
                              }
                            }}>
                              <i className="fa-solid fa-play"></i>
                            </Link>

                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p>{selectedTVSeriesContents['description']}</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Container>
      </div>
    </Fragment>
  );
});

TvShowsDetail.displayName = "TvShowsDetail";
export default TvShowsDetail;
