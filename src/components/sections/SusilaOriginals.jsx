import { Fragment, memo, useEffect, useState } from "react";

//components
import SectionSlider from "../slider/SectionSlider";
import CardStyle from "../../components/cards/CardStyle";

//data
import { upcommingMovie } from "../../StaticData/data";

// the hook
import { useTranslation } from "react-i18next";
import { executeGetSusilaOriginals } from "../../api/endPoints.jsx";


const SusilaOriginals = memo((props) => {
    const { t } = useTranslation();
    const [upcommingMovie2] = useState(upcommingMovie);
    const { susilaOriginalsDta } = props;


    const upcoming = t(props.title) || t("explore.susila_originals_title")

    return (
        <Fragment>
            <SectionSlider
                title={upcoming}
                list={susilaOriginalsDta}
                className="upcomimg-block streamit-block"
                slidesPerView={props.slides}
                viewAll={props.viewAll}
                slideMedium={props.slideMedium}
                paddingY={props.paddingY}
            // loop={true}
            >
                {(susilaOriginalsDta) => (
                    <CardStyle
                        image={susilaOriginalsDta.thumbnail_url}
                        title={t(susilaOriginalsDta.title)}
                        movieTime={susilaOriginalsDta.movieTime}
                        watchlistLink="/playlist"
                        link="/shows-details"
                    />
                )}
            </SectionSlider>
        </Fragment>
    );
});

upcommingMovie.DisplayName = upcommingMovie;
export default SusilaOriginals;
