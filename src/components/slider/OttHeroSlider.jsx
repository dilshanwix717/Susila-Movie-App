import React, { memo, Fragment, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../store/setting/selectors";
import { useTranslation } from "react-i18next";
import { executeGetBanners } from "../../api/endPoints.jsx";
import { useViewData } from "../../ViewDataContext.jsx";

const OttHeroSlider = memo(() => {
  const { setSelectedTVSeriesContents, setSelectedTVSeries } = useViewData();
  const { t } = useTranslation();
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active, setActive] = useState(false);
  const location = useLocation();
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    if (location.pathname === "/") {
      if (themeSchemeDirection === 'rtl') {
        const updateWrapperClass = (wrapper, slideIndex, element) => {
          wrapper.classList.add('swiper-rtl-wrapper');
          element.classList.contains('swiper-slide-active') && element.parentNode.classList.add(`iq-small-rtl-${slideIndex}`);
        };

        document.querySelectorAll('.swiper-wrapper').forEach((wrapper, index) => {
          updateWrapperClass(wrapper, index + 1, wrapper.querySelector('.swiper-slide-active'));
        });
      }
      return () => {
        document.querySelectorAll('.swiper-wrapper').forEach(wrapper => wrapper.classList.remove('swiper-rtl-wrapper'));
      };
    }
  }, [active, themeSchemeDirection]);

  const getBanner = async () => {
    try {
      const response = await executeGetBanners();
      setBannerData(response.data['data']);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <Fragment>
      <div className="iq-banner-thumb-slider">
        <div className="slider">
          <div className="position-relative slider-bg d-flex justify-content-end">
            <div className="slider-images iq-rtl-thumb-swiper" data-swiper="slider-images-ott">
              <Swiper
                dir={themeSchemeDirection}
                onSwiper={setThumbsSwiper}
                slidesPerView={1}
                navigation={{
                  prevEl: ".swiper-banner-button-prev",
                  nextEl: ".swiper-banner-button-next",
                }}
                watchSlidesProgress={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  0: { allowTouchMove: true },
                  768: { allowTouchMove: true },
                  1025: { allowTouchMove: false },
                  1500: { allowTouchMove: false },
                }}
                allowTouchMove={false}
                loop={true}
                className="swiper-container"
                id="iq-rtl-thumb-swiper"
                modules={[Navigation, Thumbs]}
              >
                {bannerData
                  .filter(item => item.deviceVersion === "landscape")
                  .map((item, index) => (
                    <SwiperSlide className="p-0" key={index}>
                      <div className="slider--image block-images">
                        <img src={item.banner_url} loading="lazy" alt="banner" />
                      </div>
                      <div className="description">
                        <div className="row align-items-center h-100">
                          <div className="col-lg-6 col-md-12">
                            <div className="slider-content">
                              <div className="d-flex align-items-center RightAnimate mb-3">
                                <span className="badge rounded-0 text-dark text-uppercase px-3 py-2 me-3 bg-white mr-3">
                                  {item.category}
                                </span>
                              </div>
                              <h1 className="texture-text big-font letter-spacing-1 line-count-1 text-capitalize RightAnimate-two">
                                {item.title}
                              </h1>
                              <p className="line-count-3 RightAnimate-two">{item.description}</p>
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
                                <span className="button-text">{t("ott_home.stream_now")}</span> <i className="fa-solid fa-play"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                {/* Swipe Buttons - Place them inside the Swiper component but outside SwiperSlides */}
                {/* <div
                  className="swiper-banner-button-prev swiper-nav position-absolute top-50 start-0 translate-middle-y ms-3"
                  id="swiper-banner-button-prev"
                >
                  <i className="iconly-Arrow-Left-2 icli"></i>
                </div>
                <div
                  className="swiper-banner-button-next swiper-nav position-absolute top-50 end-0 translate-middle-y me-3"
                  id="swiper-banner-button-next"
                >
                  <i className="iconly-Arrow-Right-2 icli"></i>
                </div> */}


                {/* Swipe Buttons */}
                <div
                  className="swiper-banner-button-prev swiper-nav"
                  id="swiper-banner-button-prev"
                >
                  <i></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 44 44"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle r="20" cy="22" cx="22"></circle>
                  </svg>
                </div>

                <div
                  className="swiper-banner-button-next swiper-nav"
                  id="swiper-banner-button-next"
                >
                  <i></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 44 44"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle r="20" cy="22" cx="22"></circle>
                  </svg>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );


});

OttHeroSlider.displayName = OttHeroSlider;
export default OttHeroSlider;
