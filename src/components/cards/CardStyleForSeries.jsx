import { Fragment, memo, useEffect } from "react";

//react-router-dom
import { Link } from "react-router-dom";

// the hook
import { useTranslation } from "react-i18next";
import { useViewData } from "../../ViewDataContext.jsx";

const CardStyleForSeries = memo(({ title, movieTime, watchlistLink, link, image, selectedVideo_Data, selectedVideo_Array }) => {
  const { t } = useTranslation();
  const { setVideoUrls, videoUrls, selectedVideoData, setSelectedVideoData,
    selectedVideoArray, setSelectedVideoArray } = useViewData();
  // console.log('movie_url in CardStyle:', video_url);
  const { setSelectedTVSeriesContents, setSelectedTVSeries } = useViewData();

  // useEffect(() => {
  //   console.log('videoUrls in CardStyle====>', videoUrls);
  //   // Ensure videoUrls is defined and use it as needed
  // }, [videoUrls]);

  return (
    <Fragment>
      {/*{console.log('videoUrls in CardStyle====>', movie_url)}*/}
      <div className="iq-card card-hover">
        <div className="block-images position-relative w-100">
          <div className="img-box w-100">
            <Link
              to="/shows-details"
              onClick={() => {
                // setVideoUrls(video_url)
                setSelectedTVSeries(selectedVideo_Data['title'])
                setSelectedTVSeriesContents(selectedVideo_Data)
              }}
              className="position-absolute top-0 bottom-0 start-0 end-0"
            ></Link>
            <img
              src={image}
              alt="movie-card"
              className="img-fluid object-cover w-100 d-block border-0"
            />
          </div>
          <div className="card-description with-transition">
            <div className="cart-content">
              <div className="content-left  justify-content-between align-items-end">
                <h5 className="iq-title text-capitalize mb-2">
                  <Link to={link}>{t(title)}</Link>
                </h5>
                {/* <div className=" justify-content-between align-items-end">
                  <div className="watchlist ms-auto">
                    <Link className="watch-list-not" to={watchlistLink}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon-10"
                      >
                        <path
                          d="M12 4V20M20 12H4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className="watchlist-label">{t("ott_home.watchlist")}</span>
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="block-social-info align-items-center">
            <ul className="p-0 m-0 d-flex gap-2 music-play-lists">

              {/* <li className="share position-relative d-flex align-items-center text-center mb-0">
                <span className="w-100 h-100 d-inline-block bg-transparent">
                  <i className="fa-regular fa-heart"></i>
                </span>
                <div className="share-wrapper">
                  <div className="share-boxs d-inline-block">
                    <svg
                      width="15"
                      height="40"
                      className="share-shape"
                      viewBox="0 0 15 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.8842 40C6.82983 37.2868 1 29.3582 1 20C1 10.6418 6.82983 2.71323 14.8842 0H0V40H14.8842Z"
                        fill="#191919"
                      ></path>
                    </svg>
                    <div className="overflow-hidden">
                      <span>+51</span>
                    </div>
                  </div>
                </div>
              </li> */}
            </ul>
            <div className="iq-button">
              <Link
                to="/shows-details"
                className="btn text-uppercase position-relative rounded-circle"
                onClick={() => {
                  // setVideoUrls(video_url)
                  setSelectedTVSeries(selectedVideo_Data['title'])
                  setSelectedTVSeriesContents(selectedVideo_Data)
                }}
              >
                <i className="fa-solid fa-play ms-0"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

CardStyleForSeries.displayName = "CardStyleForSeries";
export default CardStyleForSeries;