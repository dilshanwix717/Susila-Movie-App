import { memo, Fragment, useState, useEffect } from "react";
import SectionSlider from "../slider/SectionSlider";
import { sectionSliders } from "../../StaticData/data";
import { useTranslation } from "react-i18next"
import { executeGetSusilaOriginals } from "../../api/endPoints.jsx";
import CardStyleForSeries from "../cards/CardStyleForSeries.jsx";


const SusilaOriginals = memo(({ contentData }) => {
  const { t } = useTranslation();
  const [onlyonstreamit] = useState(sectionSliders);

  return (
    <Fragment>
      <SectionSlider
        title={'Susila Originals'}
        list={contentData}
        className="streamit-block"
        // loop={true}
        paddingY="my-4"
      >
        {(data) => (
          <CardStyleForSeries
            image={data.thumbnail_url}
            title={data.title}
            // movieTime={t(data.movieTime)}
            // movie_url={data.video_url}
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

SusilaOriginals.displayName = "SusilaOriginals";
export default SusilaOriginals;
