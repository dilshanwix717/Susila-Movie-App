import { memo, Fragment, useState, useEffect } from "react";
// hero slider
import OttHeroSlider from "../../components/slider/OttHeroSlider";
// sections
import PopularMovies from "../../components/sections/PopularMovies";
import TabSlider from "../../components/sections/TabSlider";
//static data
import SusilaOriginals from "../../components/sections/OnlyOnStreamit";
import { executeGetMovies, executeGetSusilaOriginals } from "../../api/endPoints.jsx";
import LatestContents from "../../components/sections/LatestContents.jsx";
import VerticalSliderHome from "../../components/slider/VerticalSliderHome.jsx";

const HomePage = memo(() => {
    const [susilaData, setSusilaData] = useState([]);
    const [moviesData, setMoviesData] = useState([]);
    const [susilaOriginalsData, setSusilaOriginalsData] = useState([]);


    const getSusilaOriginals = async () => {
        console.log('content Data Execute start');
        try {
            const response = await executeGetSusilaOriginals();
            var allSusilaOriginalsData = response.data["data"];
            console.log('Content Data :==============>>>', response.data['data']);
            setSusilaOriginalsData(response.data['data']);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const getMovies = async () => {
        // console.log('function Execute start ');
        try {
            const response = await executeGetMovies();
            const allMovies = response.data.data;
            setMoviesData(allMovies);
            // console.log(' Data list Movies:==============>>>', movies);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getMovies();
        getSusilaOriginals();
    }, []);

    return (
        <Fragment>
            <OttHeroSlider />
            {/*<ContinueWatching slidesPerView={5} />*/}
            {/*<TopTenMoviesToWatch />*/}
            <SusilaOriginals contentData={susilaOriginalsData} />
            <LatestContents />
            {/* <VerticalSliderHome sliderData={moviesData} containerFluid="container-fluid" /> */}
            {/*<YourFavouritePersonality paddingY="my-4" />*/}

            <TabSlider />
            <PopularMovies paddingY="my-4" />
            {/*<GenreSlider />*/}
            {/*<RecommendedForYou paddingY="my-4" />*/}
            {/*<TopPicsForYou paddingY="my-4" />*/}

        </Fragment>
    );
});

HomePage.displayName = "HomePage";
export default HomePage;
