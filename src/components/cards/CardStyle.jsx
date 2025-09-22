import { Fragment, memo, useEffect } from "react";

//react-router-dom
import { Link } from "react-router-dom";

// the hook
import { useTranslation } from "react-i18next";
import { useViewData } from "../../ViewDataContext.jsx";

const CardStyle = memo(({ title, movieTime, watchlistLink, link, image, video_url, selectedVideo_Data, selectedVideo_Array }) => {
  const { t } = useTranslation();
  const { setVideoUrls, videoUrls, selectedVideoData, setSelectedVideoData,
    selectedVideoArray, setSelectedVideoArray } = useViewData();
  // console.log('movie_url in CardStyle:', video_url);

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
              to="/movies-detail"
              onClick={() => {
                setVideoUrls(video_url)
                setSelectedVideoData(selectedVideo_Data)
                setSelectedVideoArray(selectedVideo_Array)
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
                <div className=" justify-content-between align-items-end">

                </div>
              </div>
            </div>
          </div>
          <div className="block-social-info align-items-center">
            <ul className="p-0 m-0 d-flex gap-2 music-play-lists">
            </ul>
            <div className="iq-button">
              <Link
                to="/movies-detail"
                className="btn text-uppercase position-relative rounded-circle"
                onClick={() => {
                  setVideoUrls(video_url)
                  setSelectedVideoData(selectedVideo_Data)
                  setSelectedVideoArray(selectedVideo_Array)
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

CardStyle.displayName = "CardStyle";
export default CardStyle;