import {memo, Fragment, useState, useEffect} from "react";

//component
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../../components/cards/CardStyle";

//static data
import { sectionSliders } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next"
import {executeGetLatestContent, executeGetSusilaOriginals} from "../../api/endPoints.jsx";
import {useViewData} from "../../ViewDataContext.jsx";



const LatestContents = memo(() => {
    const { t } = useTranslation();
    const [onlyonstreamit] = useState(sectionSliders);
    const [latestContentData,setLatestContentData]= useState([]);
    const { setVideoUrls,videoUrls } = useViewData();
    const getLatestContents = async () => {
        // console.log('content Data Execute start');
        try {
            const response = await executeGetLatestContent();
            var allSusilaOriginalsData = response.data["data"];
            // console.log('Content Data :==============>>>', response.data['data']);
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
                title={'Latest Contents'}
                list={latestContentData}
                className="streamit-block"
                // loop={true}
                paddingY="my-4"
            >
                {(data) => (
                    <CardStyle
                        image={data.thumbnail_url}
                        title={data.title}
                        // movieTime={t(data.movieTime)}
                        video_url={data.video_url}
                        selectedVideo_Data={data}
                        selectedVideo_Array={latestContentData}
                        // onClick={setVideoUrls(data.video_url)}
                        watchlistLink="/playlist"
                        // link="/movies-detail"
                    />
                )}
            </SectionSlider>
        </Fragment>
    );
});

LatestContents.displayName = "LatestContents";
export default LatestContents;
