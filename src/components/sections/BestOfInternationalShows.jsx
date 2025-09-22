import { useState, Fragment, memo, useEffect } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

//static data
import { latestMovie } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import { executeGetLatestContent, executeGetLatestTVSeries } from "../../api/endPoints.jsx";
import CardStyleForSeries from "../cards/CardStyleForSeries.jsx";

const LatestTvShows = memo((props) => {
  const { t } = useTranslation();
  const [latestContentData, setLatestContentData] = useState([]);

  const getLatestContents = async () => {
    try {
      const response = await executeGetLatestTVSeries();
      setLatestContentData(response.data['data']);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getLatestContents()
  }, []);

  return (
    <Fragment>
      <SectionSlider
        title={'Latest TV Shows'}
        list={latestContentData}
        className="recommended-block section-top-spacing streamit-block"
        slideMedium={props.slideMedium}
        paddingY={props.paddingY}
      // loop={true}
      >

        {(data) => (
          <CardStyleForSeries
            image={data.thumbnail_url}
            title={data.title}
            // movieTime={data.movieTime}
            // video_url={data.video_url}
            selectedVideo_Data={data}
            selectedVideo_Array={latestContentData}
            watchlistLink="/playlist"
          // link="/episodes"
          />
        )}
      </SectionSlider>
    </Fragment>
  );
});

LatestTvShows.displayName = "LatestTvShows";
export default LatestTvShows;
