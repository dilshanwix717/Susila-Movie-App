import { Fragment, memo, useState, useEffect } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../../components/cards/CardStyle";


//static data
import { latestMovie, suggested } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { executeGetMovies, executeGetSusilaOriginals } from "../../api/endPoints.jsx";


const MoviesList = memo((props) => {
  const { t } = useTranslation();
  const [latestContentData, setLatestContentData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const getMovies = async () => {
    console.log('content Data Execute start');
    try {
      const response = await executeGetMovies();
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
        title={'Movies'}
        list={movieData}
        className="popular-movies-block streamit-block"
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

MoviesList.DisplayName = "MoviesList";
export default MoviesList;
