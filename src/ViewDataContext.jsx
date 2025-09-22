import React, { createContext, useContext, useState } from "react";

const ViewDataContext = createContext();

export const useViewData = () => {
    return useContext(ViewDataContext);
};

export const ViewDataProvider = ({ children }) => {
    const [viewData, setViewData] = useState([]);
    const [arrayTitle, setArrayTitle] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [selectedVideoData, setSelectedVideoData] = useState([]);
    const [selectedVideoArray, setSelectedVideoArray] = useState([]);
    const [selectedTVSeries, setSelectedTVSeries] = useState('');
    const [selectedTVSeriesContents, setSelectedTVSeriesContents] = useState([]);

    return (
        <ViewDataContext.Provider value={{
            viewData,
            setViewData,
            arrayTitle, setArrayTitle,
            videoUrls,
            setVideoUrls,
            selectedVideoData, setSelectedVideoData,
            selectedVideoArray, setSelectedVideoArray,
            selectedTVSeries, setSelectedTVSeries,
            selectedTVSeriesContents, setSelectedTVSeriesContents,
        }}>
            {children}
        </ViewDataContext.Provider>
    );
};
