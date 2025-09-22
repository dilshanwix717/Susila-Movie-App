import { Fragment, memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../store/setting/selectors";
import FsLightbox from "fslightbox-react";
import { useTranslation } from "react-i18next";
import { useEnterExit } from "../../utilities/usePage";
import { generateImgPath } from "../../StaticData/data";
import { executeGetContent, executeGetFeaturedTeleseries } from "../../api/endPoints";
import { useViewData } from "../../ViewDataContext";

const TvShowHeroSlider = memo(() => {
  useEnterExit();
  const { setSelectedTVSeriesContents, setSelectedTVSeries } = useViewData();
  const { t } = useTranslation();
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const [toggler, setToggler] = useState(false), [featuredData, setFeaturedData] = useState([]);
  const video = generateImgPath("/assets/images/video/trailer.mp4");

  const fetchData = async (fetchMethod, setter) => {
    try {
      const response = await fetchMethod();
      setter(response.data['data']);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => { fetchData(executeGetFeaturedTeleseries, setFeaturedData) }, []);

  return (
    <Fragment>
      <section className="banner-container">
        <div className="movie-banner">
          <div id="banner-detail-slider" className="banner-container">
            <Swiper
              key={themeSchemeDirection}
              dir={themeSchemeDirection}
              navigation={{ prevEl: ".swiper-banner-button-prev", nextEl: ".swiper-banner-button-next" }}
              slidesPerView={1.2}
              modules={[Navigation]}
              loop={true}
              centeredSlides={true}
              className="swiper-banner-container"
            >
              {featuredData.map((item, index) => (
                <SwiperSlide key={index} className="p-0">
                  <div className="movie-banner-image">
                    <img src={item.thumbnail_url} alt="movie-banner" />
                  </div>
                  <div className="shows-content h-100">
                    <Row className="row align-items-center h-100">
                      <Col lg="7" md="12">
                        <h1 className="texture-text big-font letter-spacing-1 line-count-1 text-uppercase RightAnimate-two" data-animation-in="fadeInLeft" data-delay-in="0.6">
                          {item.title}
                        </h1>
                        <div className="flex-wrap align-items-center fadeInLeft animated" data-animation-in="fadeInLeft" style={{ opacity: 1 }}>
                          <div className="d-flex flex-wrap align-items-center gap-3 movie-banner-time">
                            <span className="badge bg-secondary p-2">
                              <i className="fa fa-eye"></i> {item.subcategory}
                            </span>
                          </div>
                        </div>
                        <div className="iq-button" data-animation-in="fadeInUp" data-delay-in="1.2">
                          <Link
                            to="/shows-details"
                            className="btn text-uppercase position-relative"
                            onClick={() => {
                              setSelectedTVSeries(item.title);
                              setSelectedTVSeriesContents(item);
                            }}
                          >
                            <span className="button-text">{t("detail_page.play_now")}</span>{" "}
                            <i className="fa-solid fa-play"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-banner-button-next">
                <i className="iconly-Arrow-Right-2 icli arrow-icon"></i>
              </div>
              <div className="swiper-banner-button-prev">
                <i className="iconly-Arrow-Left-2 icli arrow-icon"></i>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
      <FsLightbox toggler={toggler} sources={[video]} />
    </Fragment>
  );
});

TvShowHeroSlider.displayName = TvShowHeroSlider;
export default TvShowHeroSlider;
