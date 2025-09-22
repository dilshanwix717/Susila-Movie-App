import { memo, useEffect, useState } from "react";
import HomeHeroSlider from "../../components/slider/HomeHeroSlider";
import ContinueWatching from "../../components/sections/ContinueWatching";
import SusilaOriginals from "../../components/sections/OnlyOnStreamit";
import TeledramaSeries from "../../components/sections/TeledramaSeries.jsx";
import WebSeriesList from "../../components/slider/VerticalSectionSlider.jsx";
import TrendingSlider from "../../components/sections/TeledramaList.jsx";
import MoviesList from "../../components/sections/MoviesList.jsx";
import TravelSeries from "../../components/sections/TravelSeries.jsx";
import ParallexSection from "../../components/sections/ParallexSection";


import {
    executeGetMovies,
    executeGetSusilaOriginals,
    executeGetTeledramaSeries,
    executeGetWebSeries
} from "../../api/endPoints.jsx";
import TeledramaList from "../../components/sections/TeledramaList.jsx";


const HomePage = memo(() => {
    const showViewAllLink = true;
    const [susilaOriginalsData, setSusilaOriginalsData] = useState([]);
    const [teledramaSeriesData, setTeledramaSeriesData] = useState([]);
    const [webSeriesData, setWebSeriesData] = useState([]);
    const [movies, setMovies] = useState([]);

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

    const fetchTeledramaSeries = async () => {
        // console.log('function Execute start');
        try {
            const response = await executeGetTeledramaSeries();
            const allTeledramaSeries = response.data.data;
            setTeledramaSeriesData(allTeledramaSeries);
            // console.log(' Data list TeleSeries:==============>>>', teledramaSeriesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchWebSeries = async (seriesName) => {
        try {
            const response = await executeGetWebSeries({ seriesName });
            const allWebSeries = response.data.data;

            // Add index to each web series item
            const indexedWebSeries = allWebSeries.map((item, index) => ({
                ...item,
                index, // Add index here
            }));

            setWebSeriesData(indexedWebSeries);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchMovies = async () => {
        // console.log('function Execute start ');
        try {
            const response = await executeGetMovies();
            const allMovies = response.data.data;
            setMovies(allMovies);
            // console.log(' Data list Movies:==============>>>', movies);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getSusilaOriginals();
        fetchTeledramaSeries();
        fetchWebSeries("webSeries");
        fetchMovies();
    }, []);

    return (
        <>
            <WebSeriesList sliderData={webSeriesData} containerFluid="container-fluid" />
            {/* <HomeHeroSlider /> */}
            <SusilaOriginals contentData={susilaOriginalsData} />

            <TeledramaSeries slideMedium={2} paddingY="my-4" />
            <MoviesList paddingY="my-4" />
            {/* <TeledramaList teledramaSeriesData={teledramaSeriesData} /> */}
            {/* <ParallexSection /> */}
            {/* <TravelSeries paddingY='my-4' /> */}
            {/* <TrendingSlider /> */}

        </>
    );
});

HomePage.displayName = "HomePage";
export default HomePage;
