import {useState, Fragment, memo, useEffect} from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

//static data
import { recommendedforYou } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import {executeGetLatestContent, executeGetRandomTVSeries} from "../../api/endPoints.jsx";
import CardStyleForSeries from "../cards/CardStyleForSeries.jsx";
import {useViewData} from "../../ViewDataContext.jsx";

const ShowsWeRecommend = memo((props) => {
  const { t } = useTranslation();
    const [contentData,setContentData]= useState([]);
    const { setSelectedTVSeriesContents,setSelectedTVSeries } = useViewData();
    const getRecommendContents = async () => {
        // console.log('content Data Execute start');
        try {
            const response = await executeGetRandomTVSeries();
            var allSusilaOriginalsData = response.data["data"];
            // console.log('Content Data :==============>>>', response.data['data']);
            setContentData(response.data['data']);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getRecommendContents()
    }, []);
  return (
    <Fragment>
      <SectionSlider
        title={t("form.shows_recommend")}
        list={contentData}
        className="recommended-block streamit-block"
        slideMedium={props.slideMedium}
        paddingY={props.paddingY}
      // loop={true}
      >
        {(data) => (
          <CardStyleForSeries
            image={data.thumbnail_url}
            title={t(data.title)}
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

ShowsWeRecommend.displayName = "ShowsWeRecommend";
export default ShowsWeRecommend;
