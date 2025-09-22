import { Fragment, memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../store/setting/selectors";
import { useViewData } from "../../ViewDataContext"; // Import useViewData

const VerticalSectionSlider = memo(({ sliderData, containerFluid }) => {
  const { t } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const navigate = useNavigate(); // Hook for navigation
  const { setSelectedTVSeries, setSelectedTVSeriesContents } = useViewData();

  const handlePlayNow = (data) => {

    setSelectedTVSeries(data.title);
    setSelectedTVSeriesContents(data);

    navigate("/shows-details"); // Navigate to the movie detail page

  };

  return (
    <Fragment>
      <div className="verticle-slider section-padding-bottom">
        <div className={containerFluid}>
          <div className="slider">
            <div className="slider-flex position-relative">
              <div className="slider--col position-relative">
                <div className="vertical-slider-prev swiper-button">
                  <i className="iconly-Arrow-Up-2 icli"></i>
                </div>
                <div className="slider-thumbs" data-swiper="slider-thumbs">
                  <Swiper
                    spaceBetween={24}
                    slidesPerView={3}
                    dir={themeSchemeDirection}
                    navigation={{
                      nextEl: ".vertical-slider-next",
                      prevEl: ".vertical-slider-prev",
                    }}
                    loop={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    direction="vertical"
                    className="swiper-wrapper top-ten-slider-nav"
                    initialSlide={1} // Set to 1 for the middle slide
                  >
                    {sliderData.map((data) => (
                      <SwiperSlide
                        key={data.title + "tranding-thumb"}
                        tag="li"
                        className="swiper-slide swiper-bg"
                      >
                        <div className="block-images position-relative">
                          <div className="img-box slider--image">
                            <img
                              src={data.thumbnail_url}
                              className="img-fluid"
                              alt={data.title}
                              loading="lazy"
                            />
                          </div>
                          <div className="block-description">
                            <h6 className="iq-title">
                              <Link to="/shows-details">{data.title}</Link>
                            </h6>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="slider-next btn-verticle">
                    <i className="ri-arrow-down-s-line vertical-aerrow"></i>
                  </div>
                </div>
                <div
                  className="vertical-slider-next swiper-button"
                  tabIndex="0"
                  role="button"
                  aria-label="Next slide"
                >
                  <i className="iconly-Arrow-Down-2 icli"></i>
                </div>
              </div>
              <div className="slider-images" data-swiper="slider-images">
                <Swiper
                  dir={themeSchemeDirection}
                  spaceBetween={10}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="swiper-container responsive-swiper-vertical"
                  loop={true}
                  watchSlidesProgress={true}
                  onSwiper={setThumbsSwiper}
                  initialSlide={1} // Set to 1 for the middle slide
                  breakpoints={{
                    675: {
                      direction: "horizontal",
                    },
                    1025: {
                      direction: "vertical",
                    },
                  }}
                >
                  {sliderData.map((data) => (
                    <SwiperSlide key={data.title + "tranding-slide"}>
                      <div className="slider--image block-images">
                        <img
                          src={data.thumbnail_url}
                          loading="lazy"
                          alt={data.title}
                          className="img-fluid"
                        />
                      </div>
                      <div className="description">
                        <div className="block-description">
                          <h2 className="iq-title mb-3">{data.title}</h2>
                          <p className="mt-0 mb-3 line-count-3">
                            {data.description}
                          </p>
                          <div className="iq-button">
                            <button
                              className="btn text-uppercase position-relative"
                              onClick={() => handlePlayNow(data)}
                            >
                              <span className="button-text">
                                {t("ott_home.play_now")}
                              </span>
                              <i className="fa-solid fa-play"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

VerticalSectionSlider.displayName = "VerticalSectionSlider";
export default VerticalSectionSlider;