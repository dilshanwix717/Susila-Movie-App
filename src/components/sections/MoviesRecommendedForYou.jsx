
import { useState, Fragment, memo, useEffect } from "react";

//componets
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../cards/CardStyle";

// the hook
import { useTranslation } from "react-i18next";
import { excecuteGetRandomMovies, executeGetSusilaOriginals } from "../../api/endPoints.jsx";

const RecommendedForYou = memo((props) => {
  const { t } = useTranslation();
  const [latestContentData, setLatestContentData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const getMovies = async () => {
    console.log('content Data Execute start');
    try {
      const response = await excecuteGetRandomMovies();
      // console.log('Content Data :==============>>>', response.data['data']);
      setMovieData(response.data['data']);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getMovies()
  }, []);

  return (
    <Fragment>
      <SectionSlider
        title={'Movies We Recommend'}
        list={movieData}
        className="recommended-block streamit-block"
        // loop={true}
        paddingY={props.paddingY}
      >
        {(data) => (
          <CardStyle
            image={data.thumbnail_url}
            title={data.title}
            // movieTime={data.movieTime}
            watchlistLink="/playlist"
            link="/movies-detail"
            selectedVideo_Data={data}
            selectedVideo_Array={movieData}
          />
        )}
      </SectionSlider>
    </Fragment>
  );
});

RecommendedForYou.displayName = "RecommendedForYou";
export default RecommendedForYou;
