import {useState, Fragment, memo, useEffect} from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

//static data
import { populerSlider } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import {executeGetLatestContent, executeGetSeries} from "../../api/endPoints.jsx";
import CardStyleForSeries from "../cards/CardStyleForSeries.jsx";

const TVPopularShows = memo((props) => {
  const { t } = useTranslation();
    const [contentData,setContentData]= useState([]);
    const getAllSeries = async () => {
        // console.log('content Data Execute start');
        try {
            const response = await executeGetSeries();
            setContentData(response.data['data']);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getAllSeries()
    }, []);
  return (
    <Fragment>
      <SectionSlider
        title={'All TV Shows'}
        list={contentData}
        className="recommended-block section-top-spacing"
        wrapperClass={true}
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
            selectedVideo_Array={contentData}
            watchlistLink="/playlist"
            // link="/movies-detail"
          />
        )}
      </SectionSlider>
    </Fragment>
  );
});

TVPopularShows.displayName = TVPopularShows;
export default TVPopularShows;
