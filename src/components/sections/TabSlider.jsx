import { Fragment, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateImgPath } from "../../StaticData/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../store/setting/selectors";
import { useTranslation } from "react-i18next";
import { executeGetContent } from "../../api/endPoints.jsx";
import { useViewData } from "../../ViewDataContext.jsx"; // Assuming you have a ViewDataContext for shared state.

const TabSlider = memo(() => {
  const { t } = useTranslation();
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const [contentData, setContentData] = useState([]);
  const { setSelectedTVSeries, setSelectedTVSeriesContents } = useViewData();

  const getContent = async () => {
    try {
      const response = await executeGetContent("36SErmCtUbHN29JoByFZ");
      setContentData(response.data["data"]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  const handlePlayNowClick = (data) => {
    setSelectedTVSeries(data.title);
    setSelectedTVSeriesContents(data);
  };

  return (
    <Fragment>
      <div className="tab-slider">
        <div className="slider">
          <Swiper
            key={themeSchemeDirection}
            dir={themeSchemeDirection}
            watchSlidesProgress={true}
            className="wrapper-class position-relative swiper swiper-card wrapper-class custom-tab-slider"
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
          >
            {contentData &&
              contentData
                .filter((data) => data.categoryID === "36SErmCtUbHN29JoByFZ")
                .map((data) => (
                  <SwiperSlide
                    tag="li"
                    className="tab-slider-banner p-0"
                    key={data.thumbnail_url}
                  >
                    <div className="tab-slider-banner-images">
                      <img
                        src={data.thumbnail_url}
                        alt="tab-slider-background"
                      />
                    </div>
                    <div className="block-images position-relative w-100">
                      <div className="container-fluid">
                        <div className="row align-items-center min-vh-100 h-100 my-4">
                          <div className="col-md-5 col-lg-5 col-xxl-5">
                            <div className="tab-left-details">
                              <h1 className="mb-2 fw-500 text-capitalize texture-text">
                                {data.title}
                              </h1>
                              <p className="mb-0 font-size-14 line-count-2 ms-5">
                                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                                  {data.description}
                                </pre>
                              </p>
                              <ul className="d-flex align-items-center list-inline gap-2 movie-tag p-0 mt-3 mb-40">
                                <li className="font-size-18">{data.season}</li>
                              </ul>
                              <div className="iq-button">
                                <Link
                                  to="/shows-details"
                                  className="btn text-uppercase position-relative"
                                  onClick={() => handlePlayNowClick(data)}
                                >
                                  <span className="button-text">
                                    {t("ott_home.stream_now")}
                                  </span>{" "}
                                  <i className="fa-solid fa-play"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1 col-lg-2 col-xxl-3"></div>
                          <div className="col-md-6 col-lg-5 col-xxl-4 mt-5 mt-md-0">
                            <div className="tab-block">
                              <h4 className="tab-title text-capitalize mb-0">
                                {t("ott_home.all_episode")}
                              </h4>
                              <div className="tab-bottom-bordered border-0 trending-custom-tab"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            <div className="joint-arrows">
              <div className="swiper-button swiper-button-next"></div>
              <div className="swiper-button swiper-button-prev"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </Fragment>
  );
});

TabSlider.displayName = "TabSlider";
export default TabSlider;
